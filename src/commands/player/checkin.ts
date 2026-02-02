/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    PLAYER CHECK-IN COMMAND                             ║
 * ║              Entry Point for Active Scrim Lobbies                     ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { SlashCommand } from '../../types/SlashCommand';
import { BrandColors } from '../../config';
import { getDatabase } from '../../database/Database';
import { getLobbyManager } from '../../managers/LobbyManager';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('✅ Join the currently open scrim lobby'),

    cooldown: 3,
    category: 'player',

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const lobbyManager = getLobbyManager();
        const db = await getDatabase();

        // 1. Is there a lobby?
        if (!lobbyManager.isOpen()) {
            await interaction.reply({
                content: '❌ No open lobby right now. Wait for an admin to start one.',
                ephemeral: true
            });
            return;
        }

        // 2. Is player registered?
        const user = db.getUser(interaction.user.id);
        if (!user) {
            await interaction.reply({
                content: '⚠️ You must be registered to play. Use `/register` first.',
                ephemeral: true
            });
            return;
        }

        // 3. Attempt check-in
        const success = lobbyManager.checkInPlayer(interaction.user.id, user.epic_name);

        if (success) {
            await interaction.reply({
                content: `✅ You actived **${user.region}** Check-in! You are in the queue.`,
                ephemeral: true
            });
            
            // Trigger live update of the lobby message
            await lobbyManager.updateLobbyMessage(interaction.client);
        } else {
            await interaction.reply({
                content: '❌ Check-in failed. The lobby might be full or you are already in.',
                ephemeral: true
            });
        }
    }
};

export default command;
