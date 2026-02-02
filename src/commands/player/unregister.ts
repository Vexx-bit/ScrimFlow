/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    PLAYER UNREGISTER COMMAND                           ║
 * ║           Self-Service Correction for Registration Errors             ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
} from 'discord.js';
import { SlashCommand } from '../../types/SlashCommand';
import { BrandColors } from '../../config';
import { getDatabase } from '../../database/Database';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('🗑️ Unlink your Epic Games account (Use this if you made a mistake)'),

    cooldown: 30, // Higher cooldown to prevent spam usage
    category: 'player',

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });

        const db = await getDatabase();
        const existingUser = db.getUser(interaction.user.id);

        if (!existingUser) {
            await interaction.editReply({
                content: '❌ You are not registered yet. Use `/register` to join.'
            });
            return;
        }

        // Confirmation Button
        const confirmButton = new ButtonBuilder()
            .setCustomId('confirm_unregister')
            .setLabel('Yes, Unlink My Account')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🗑️');

        const cancelButton = new ButtonBuilder()
            .setCustomId('cancel_unregister')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(cancelButton, confirmButton);

        const warningEmbed = new EmbedBuilder()
            .setColor(BrandColors.WARNING)
            .setTitle('⚠️ Confirm Unregistration')
            .setDescription(
                `Are you sure you want to unlink **${existingUser.epic_name}**?\n` +
                `\n` +
                `• You will lose your spot on the leaderboard.\n` +
                `• Your earnings history will be reset if not backed up.\n` +
                `• You will need to re-register to play in scrims.`
            )
            .setFooter({ text: 'This action cannot be undone instantly.' });

        const response = await interaction.editReply({
            embeds: [warningEmbed],
            components: [row]
        });

        // Create collector
        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 15000,
            filter: i => i.user.id === interaction.user.id
        });

        collector.on('collect', async (i) => {
            if (i.customId === 'cancel_unregister') {
                await i.update({
                    content: '✅ Unregistration cancelled.',
                    embeds: [],
                    components: []
                });
                return;
            }

            if (i.customId === 'confirm_unregister') {
                // Perform deletion
                // Note: In a real app we might soft-delete, but for MVP we delete the row
                // We need to add a delete method to Database class first, or run raw query
                // Since Database.ts doesn't expose delete yet, we'll use raw DB access or add it.
                // Let's add it to Database.ts properly.
                
                // For now, we'll assume we'll update Database.ts in next step.
                // Or simplified: Just execute a command against the raw DB.
                
                // Let's update Database.ts first to support deletion.
                await i.update({
                    content: '⏳ Processing...'
                });
                
                // We need to implement deleteUser in Database class
                try {
                    // This will fail until we update Database.ts, but I will do that next
                    // Using raw run for now if possible, but Database class hides 'db'
                    // I will add the method to Database.ts in the next tool call
                     const dbInstance = await getDatabase();
                    (dbInstance as any).deleteUser(interaction.user.id);

                    await i.editReply({
                        content: '',
                        embeds: [
                            new EmbedBuilder()
                                .setColor(BrandColors.ACCENT_CYAN)
                                .setTitle('🗑️ Account Unlinked')
                                .setDescription(`Successfully unlinked **${existingUser.epic_name}** from your Discord account.`)
                        ],
                        components: []
                    });
                } catch (error) {
                    console.error('Delete error:', error);
                    await i.editReply({
                        content: '❌ Error removing account. Please contact admin.',
                        components: []
                    });
                }
            }
        });

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                try {
                    await interaction.editReply({
                        content: '❌ Request timed out.',
                        embeds: [],
                        components: []
                    });
                } catch {}
            }
        });
    }
};

export default command;
