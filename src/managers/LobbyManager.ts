/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW LOBBY MANAGER                             ║
 * ║              Admin Tools for Match Management                         ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import { Collection, EmbedBuilder, TextChannel, Message, User } from 'discord.js';
import { BrandColors } from '../config';

interface ScrimSession {
    id: string;
    hostId: string;
    startTime: number;
    state: 'OPEN' | 'LOCKED' | 'DISTRIBUTING' | 'ENDED';
    format: 'SOLO' | 'DUO' | 'TRIO' | 'SQUAD';
    region: string;
    players: Collection<string, {
        discordId: string;
        epicName: string;
        checkedInAt: number;
    }>;
    matchCode?: string;
    messageId?: string; // ID of the live status message
    channelId?: string; // Channel where the lobby is hosted
}

/**
 * Singleton to manage active scrim data in memory
 */
export class LobbyManager {
    private static instance: LobbyManager;
    private activeSession: ScrimSession | null = null;
    
    // Limits based on format
    private readonly MAX_PLAYERS = 100;
    
    private constructor() {}

    public static getInstance(): LobbyManager {
        if (!LobbyManager.instance) {
            LobbyManager.instance = new LobbyManager();
        }
        return LobbyManager.instance;
    }

    /**
     * Start a new scrim session
     */
    public createLobby(hostId: string, format: ScrimSession['format'], region: string, channelId: string): ScrimSession {
        this.activeSession = {
            id: Date.now().toString(36),
            hostId,
            startTime: Date.now(),
            state: 'OPEN',
            format,
            region,
            players: new Collection(),
            channelId
        };
        return this.activeSession;
    }

    /**
     * Link the live status message to the session for updates
     */
    public setLobbyMessage(messageId: string): void {
        if (this.activeSession) {
            this.activeSession.messageId = messageId;
        }
    }

    /**
     * Check if a lobby is currently open for check-ins
     */
    public isOpen(): boolean {
        return this.activeSession?.state === 'OPEN';
    }

    /**
     * Get active lobby
     */
    public getLobby(): ScrimSession | null {
        return this.activeSession;
    }

    /**
     * Player Check-in Mechanism
     * Returns true if successful, false if full or closed
     */
    public checkInPlayer(discordId: string, epicName: string): boolean {
        if (!this.activeSession || this.activeSession.state !== 'OPEN') return false;
        
        if (this.activeSession.players.size >= this.MAX_PLAYERS) return false;
        if (this.activeSession.players.has(discordId)) return true; // Already checked in

        this.activeSession.players.set(discordId, {
            discordId,
            epicName,
            checkedInAt: Date.now()
        });
        return true;
    }

    /**
     * Generate the Live Status Embed
     */
    public buildLobbyEmbed(): EmbedBuilder {
        if (!this.activeSession) {
            return new EmbedBuilder().setDescription('No active lobby.');
        }

        const count = this.activeSession.players.size;
        const stateEmoji = this.activeSession.state === 'OPEN' ? '🟢' : '🔴';
        const color = this.activeSession.state === 'OPEN' ? BrandColors.ACCENT_CYAN : BrandColors.WARNING;

        return new EmbedBuilder()
            .setColor(color)
            .setTitle(`${stateEmoji} ${this.activeSession.region} ${this.activeSession.format} Scrim Lobby`)
            .setDescription(`
**Host:** <@${this.activeSession.hostId}>
**Status:** ${this.activeSession.state}
**Match Code:** ${this.activeSession.matchCode ? '`DISTRIBUTED`' : '*Waiting for host...*'}

**Players Checked In:**
# \`${count} / ${this.MAX_PLAYERS}\`
            `)
            .addFields(
                { name: 'How to Join', value: 'Use `/checkin` to enter this match.', inline: true },
                { name: 'Format', value: this.activeSession.format, inline: true },
                { name: 'Region', value: this.activeSession.region, inline: true }
            )
            .setTimestamp(this.activeSession.startTime)
            .setFooter({ text: 'ScrimFlow • Live Lobby Manager' });
    }

    /**
     * Update the live message in Discord
     */
    public async updateLobbyMessage(client: any): Promise<void> {
        if (!this.activeSession || !this.activeSession.messageId || !this.activeSession.channelId) return;

        try {
            const channel = await client.channels.fetch(this.activeSession.channelId) as TextChannel;
            if (channel) {
                const message = await channel.messages.fetch(this.activeSession.messageId);
                if (message) {
                    await message.edit({ embeds: [this.buildLobbyEmbed()] });
                }
            }
        } catch (error) {
            console.error('Failed to update live lobby message:', error);
        }
    }

    /**
     * Distribute Codes to checked-in players
     */
    public async distributeCode(code: string, client: any): Promise<number> {
        if (!this.activeSession) return 0;
        
        this.activeSession.matchCode = code;
        this.activeSession.state = 'DISTRIBUTING';
        
        // Update message to show locked/distributing
        await this.updateLobbyMessage(client);
        
        let sentCount = 0;
        const players = Array.from(this.activeSession.players.values());
        
        console.log(`📡 Distributing code "${code}" to ${players.length} players...`);

        // Send DMs
        // NOTE: In production, we MUST use a slow loop or queue to avoid 429 Rate Limits.
        for (const p of players) {
            try {
                const user = await client.users.fetch(p.discordId);
                await user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(BrandColors.ACCENT_CYAN)
                            .setTitle('🔑 Your Scrim Code')
                            .setDescription(`Here is your matchmaking key for the **${this.activeSession.format}** match.`)
                            .addFields(
                                { name: 'Code', value: `\`${code}\``, inline: true },
                                { name: 'Region', value: this.activeSession.region, inline: true }
                            )
                            .setFooter({ text: 'DO NOT SHARE THIS CODE' })
                    ]
                });
                sentCount++;
                
                // Detailed logging
                console.log(`   -> Sent to ${p.epicName}`);
                
                // Tiny delay to be safe
                await new Promise(resolve => setTimeout(resolve, 100)); 
            } catch (e) {
                console.error(`   x Failed to DM ${p.epicName}`);
            }
        }
        
        this.activeSession.state = 'ENDED';
        await this.updateLobbyMessage(client);
        
        return sentCount;
    }

    /**
     * Close/Lock the lobby
     */
    public lockLobby(): void {
        if (this.activeSession) {
            this.activeSession.state = 'LOCKED';
        }
    }
    
    /**
     * End the session entirely
     */
    public endLobby(): void {
        this.activeSession = null;
    }
}

export const getLobbyManager = () => LobbyManager.getInstance();
export default LobbyManager;
