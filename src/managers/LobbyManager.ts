/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW LOBBY MANAGER                             ║
 * ║              Admin Tools for Match Management                         ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import { Collection, EmbedBuilder, User } from 'discord.js';
import { BrandColors } from '../config';

interface ScrimSession {
    id: string;
    hostId: string;
    startTime: number;
    state: 'OPEN' | 'LOCKED' | 'ALIVE' | 'ENDED';
    format: 'SOLO' | 'DUO' | 'TRIO' | 'SQUAD';
    players: Collection<string, {
        discordId: string;
        epicName: string;
        checkedInAt: number;
    }>;
    matchCode?: string;
}

/**
 * Singleton to manage active scrim data in memory
 */
export class LobbyManager {
    private static instance: LobbyManager;
    private activeSession: ScrimSession | null = null;
    
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
    public createLobby(hostId: string, format: ScrimSession['format']): ScrimSession {
        this.activeSession = {
            id: Date.now().toString(36),
            hostId,
            startTime: Date.now(),
            state: 'OPEN',
            format,
            players: new Collection()
        };
        return this.activeSession;
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
     * This is distinct from Registration. Users "Check In" to the current match.
     */
    public checkInPlayer(discordId: string, epicName: string): boolean {
        if (!this.activeSession || this.activeSession.state !== 'OPEN') return false;
        
        if (this.activeSession.players.has(discordId)) return true; // Already checked in

        this.activeSession.players.set(discordId, {
            discordId,
            epicName,
            checkedInAt: Date.now()
        });
        return true;
    }

    /**
     * Distribute Codes to checked-in players
     */
    public async distributeCode(code: string, client: any): Promise<number> {
        if (!this.activeSession) return 0;
        
        this.activeSession.matchCode = code;
        this.activeSession.state = 'LOCKED';
        
        let sentCount = 0;
        
        // This would run in background to avoid blocking
        const players = Array.from(this.activeSession.players.values());
        
        console.log(`📡 Distributing code "${code}" to ${players.length} players...`);

        // Send DMs
        // Note: In real production, use a queue system (Bull/Redis) to avoid rate limits
        for (const p of players) {
            try {
                const user = await client.users.fetch(p.discordId);
                await user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(BrandColors.ACCENT_CYAN)
                            .setTitle('🔑 Your Scrim Code')
                            .setDescription(`Here is your custom custom matchmaking key for the **${this.activeSession.format}** match.`)
                            .addFields(
                                { name: 'Code', value: `\`${code}\``, inline: true },
                                { name: 'Region', value: 'EU', inline: true } // Should pull from DB
                            )
                            .setFooter({ text: 'DO NOT SHARE THIS CODE' })
                    ]
                });
                sentCount++;
            } catch (e) {
                console.error(`Failed to DM ${p.epicName}`);
            }
        }
        
        return sentCount;
    }

    /**
     * End the session
     */
    public endLobby(): void {
        this.activeSession = null;
    }
}

export const getLobbyManager = () => LobbyManager.getInstance();
