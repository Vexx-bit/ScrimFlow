/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW TYPES                                     ║
 * ║               Strict Command Interface Definitions                    ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandOptionsOnlyBuilder,
    ChatInputCommandInteraction,
    AutocompleteInteraction,
    PermissionResolvable,
} from 'discord.js';

/**
 * Strict SlashCommand Interface
 * All commands must implement this contract
 */
export interface SlashCommand {
    /**
     * Command builder with full definition
     * Supports all variants of slash command builders
     */
    data: SlashCommandBuilder 
        | SlashCommandSubcommandsOnlyBuilder 
        | SlashCommandOptionsOnlyBuilder
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    /**
     * Main execution handler
     */
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

    /**
     * Optional autocomplete handler for dynamic suggestions
     */
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;

    /**
     * Optional cooldown in seconds
     */
    cooldown?: number;

    /**
     * Optional required permissions
     */
    permissions?: PermissionResolvable[];

    /**
     * Whether command is guild-only (default: true)
     */
    guildOnly?: boolean;

    /**
     * Category for organization and help commands
     */
    category?: string;
}

/**
 * Command execution context with enhanced metadata
 */
export interface CommandContext {
    interaction: ChatInputCommandInteraction;
    startTime: number;
}

/**
 * Cooldown tracking structure
 */
export interface CooldownData {
    userId: string;
    commandName: string;
    expiresAt: number;
}

export default SlashCommand;
