/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW ADMIN INTERFACE                           ║
 * ║              The Control Center for Hosting Matches                   ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
import { SlashCommand } from '../../types/SlashCommand';
import { BrandColors, CompetitiveRegions } from '../../config';
import { getLobbyManager } from '../../managers/LobbyManager';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('scrim')
        .setDescription('🛡️ Admin tools for managing scrim lobbies')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub
                .setName('open')
                .setDescription('Start a new scrim lobby')
                .addStringOption(opt =>
                    opt.setName('format')
                       .setDescription('Game format')
                       .setRequired(true)
                       .addChoices(
                           { name: 'Solo', value: 'SOLO' },
                           { name: 'Duo', value: 'DUO' },
                           { name: 'Trio', value: 'TRIO' },
                           { name: 'Squad', value: 'SQUAD' }
                       )
                )
                .addStringOption(opt =>
                    opt.setName('region')
                       .setDescription('Server region')
                       .setRequired(true)
                       .addChoices(
                           ...Object.entries(CompetitiveRegions).map(([k, v]) => ({ name: v.name, value: k }))
                       )
                )
        )
        .addSubcommand(sub =>
            sub.setName('close').setDescription('Lock the lobby (No more check-ins)')
        )
        .addSubcommand(sub =>
            sub.setName('end').setDescription('Force end the current session')
        )
        .addSubcommand(sub =>
            sub
                .setName('distribute')
                .setDescription('Send the custom code to all checked-in players')
                .addStringOption(opt =>
                    opt.setName('code').setDescription('The custom matchmaking key').setRequired(true)
                )
        ),

    category: 'admin',

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const subcommand = interaction.options.getSubcommand();
        const lobbyManager = getLobbyManager();

        // 🟢 OPEN LOBBY
        if (subcommand === 'open') {
            if (lobbyManager.getLobby()) {
                await interaction.reply({ content: '❌ A lobby is already active! End it first.', ephemeral: true });
                return;
            }

            const format = interaction.options.getString('format', true) as any;
            const regionKey = interaction.options.getString('region', true);
            const regionName = CompetitiveRegions[regionKey as keyof typeof CompetitiveRegions]?.name || regionKey;

            const session = lobbyManager.createLobby(
                interaction.user.id,
                format,
                regionName,
                interaction.channelId
            );

            // Send the "Live Dashboard" message
            const embed = lobbyManager.buildLobbyEmbed();
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            
            lobbyManager.setLobbyMessage(message.id);
            return;
        }

        // 🔴 CLOSE LOBBY
        if (subcommand === 'close') {
            if (!lobbyManager.isOpen()) {
                await interaction.reply({ content: '❌ No open lobby to close.', ephemeral: true });
                return;
            }

            lobbyManager.lockLobby();
            await lobbyManager.updateLobbyMessage(interaction.client);
            await interaction.reply({ content: '🔒 Lobby locked. No new players can join.', ephemeral: true });
            return;
        }

        // 📨 DISTRIBUTE CODE
        if (subcommand === 'distribute') {
            const session = lobbyManager.getLobby();
            if (!session) {
                await interaction.reply({ content: '❌ No active session.', ephemeral: true });
                return;
            }

            const code = interaction.options.getString('code', true);
            
            await interaction.reply({ 
                content: `🚀 Starting distribution of code \`${code}\` to **${session.players.size}** players...`,
                ephemeral: true 
            });

            const count = await lobbyManager.distributeCode(code, interaction.client);
            
            await interaction.followUp({
                content: `✅ Distribution complete. DMs sent to **${count}** players. Lobby ended.`,
                ephemeral: true
            });
            return;
        }

        // 💀 END LOBBY
        if (subcommand === 'end') {
            if (!lobbyManager.getLobby()) {
                await interaction.reply({ content: '❌ No active session.', ephemeral: true });
                return;
            }

            lobbyManager.endLobby();
            await interaction.reply({ content: '🛑 Session force-ended.', ephemeral: true });
            return;
        }
    }
};

export default command;
