/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    PLAYER REGISTRATION COMMAND                         ║
 * ║           Onboarding System for Competitive Players                   ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    AutocompleteInteraction,
} from 'discord.js';
import { SlashCommand } from '../../types/SlashCommand';
import { BrandColors, CompetitiveRegions, RegionKey } from '../../config';
import { getDatabase } from '../../database/Database';

const regionChoices = Object.entries(CompetitiveRegions).map(([key, region]) => ({
    name: `${region.emoji} ${region.name}`,
    value: key
}));

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('🎮 Register your Epic Games account for competitive scrims')
        .addStringOption(option =>
            option
                .setName('epic_name')
                .setDescription('Your Epic Games username (exactly as shown in-game)')
                .setRequired(true)
                .setMinLength(3)
                .setMaxLength(32)
        )
        .addStringOption(option =>
            option
                .setName('region')
                .setDescription('Your primary competitive region')
                .setRequired(true)
                .addChoices(...regionChoices)
        ),

    cooldown: 10,
    category: 'player',

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const epicName = interaction.options.getString('epic_name', true).trim();
        const regionKey = interaction.options.getString('region', true) as RegionKey;
        const region = CompetitiveRegions[regionKey];

        // Validate Epic name format (basic check)
        if (!/^[a-zA-Z0-9._\- ]+$/.test(epicName)) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(BrandColors.ERROR)
                        .setTitle('❌ Invalid Epic Name')
                        .setDescription('Epic Games usernames can only contain letters, numbers, spaces, dots, underscores, and hyphens.')
                        .setFooter({ text: 'ScrimFlow • Registration Failed' })
                ],
                ephemeral: true
            });
            return;
        }

        await interaction.deferReply();

        try {
            const db = await getDatabase();
            
            // Check if Epic name is already registered to another user
            const existingUser = db.getUserByEpicName(epicName);
            if (existingUser && existingUser.discord_id !== interaction.user.id) {
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(BrandColors.ERROR)
                            .setTitle('⚠️ Epic Name Already Registered')
                            .setDescription(`The Epic name **${epicName}** is already linked to another Discord account.\n\nIf this is your account, please contact a server administrator.`)
                            .setFooter({ text: 'ScrimFlow • Registration Conflict' })
                    ]
                });
                return;
            }

            // Register or update the user
            const { isNew, user } = db.registerUser(
                interaction.user.id,
                epicName,
                regionKey
            );

            // Build success embed
            const successEmbed = new EmbedBuilder()
                .setColor(BrandColors.ACCENT_CYAN)
                .setTitle(isNew ? '🎉 Registration Complete!' : '✅ Profile Updated!')
                .setDescription(
                    isNew 
                        ? `Welcome to the competitive scene, **${epicName}**!\n\nYou're now registered and ready to compete in ScrimFlow events.`
                        : `Your profile has been updated successfully.`
                )
                .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
                .addFields(
                    {
                        name: '🎮 Epic Name',
                        value: `\`${epicName}\``,
                        inline: true
                    },
                    {
                        name: `${region.emoji} Region`,
                        value: `\`${region.name}\``,
                        inline: true
                    },
                    {
                        name: '💰 Career Earnings',
                        value: `\`$${user.earnings.toFixed(2)}\``,
                        inline: true
                    }
                )
                .addFields({
                    name: '📋 What\'s Next?',
                    value: [
                        '▸ Use `/ping` to test your connection to game servers',
                        '▸ Join upcoming scrim lobbies when announced',
                        '▸ Track your stats on the leaderboard',
                    ].join('\n')
                })
                .setFooter({ 
                    text: `ScrimFlow • Player ID: ${interaction.user.id.slice(-6)}`,
                    iconURL: interaction.client.user?.displayAvatarURL()
                })
                .setTimestamp();

            // Add visual separator bar
            successEmbed.setAuthor({
                name: 'SCRIMFLOW REGISTRATION',
                iconURL: interaction.client.user?.displayAvatarURL()
            });

            await interaction.editReply({ embeds: [successEmbed] });

        } catch (error) {
            console.error('Registration error:', error);
            
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(BrandColors.ERROR)
                        .setTitle('❌ Registration Failed')
                        .setDescription('An error occurred while processing your registration. Please try again later.')
                        .setFooter({ text: 'ScrimFlow • Error logged for review' })
                ]
            });
        }
    },

    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const focusedOption = interaction.options.getFocused(true);
        
        if (focusedOption.name === 'region') {
            const filtered = regionChoices.filter(choice =>
                choice.name.toLowerCase().includes(focusedOption.value.toLowerCase())
            );
            await interaction.respond(filtered.slice(0, 25));
        }
    }
};

export default command;
