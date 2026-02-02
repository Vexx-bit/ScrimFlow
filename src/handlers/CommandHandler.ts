/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW COMMAND HANDLER                           ║
 * ║              Dynamic Command Loading & Execution Engine               ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import { Client, Collection, REST, Routes, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';
import { SlashCommand } from '../types/SlashCommand';
import { Config, BrandColors } from '../config';
import path from 'path';
import fs from 'fs';

/**
 * Professional Command Handler
 * Dynamically loads, registers, and executes slash commands
 */
export class CommandHandler {
    private client: Client;
    private commands: Collection<string, SlashCommand>;
    private cooldowns: Collection<string, Collection<string, number>>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection();
        this.cooldowns = new Collection();
    }

    /**
     * Load all commands from the commands directory
     */
    public async loadCommands(): Promise<void> {
        const commandsPath = path.join(__dirname, '..', 'commands');
        
        console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  🔧 LOADING COMMANDS                                                   ║
╚═══════════════════════════════════════════════════════════════════════╝
        `);

        await this.loadCommandsRecursive(commandsPath);

        console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  ✅ COMMANDS LOADED: ${String(this.commands.size).padEnd(47)}  ║
╚═══════════════════════════════════════════════════════════════════════╝
        `);
    }

    /**
     * Recursively load commands from all subdirectories
     */
    private async loadCommandsRecursive(dir: string): Promise<void> {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            return;
        }

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await this.loadCommandsRecursive(fullPath);
            } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
                try {
                    // Dynamic import for the command module
                    const commandModule = await import(fullPath);
                    const command: SlashCommand = commandModule.default ?? commandModule;

                    if (this.isValidCommand(command)) {
                        const commandName = command.data.name;
                        this.commands.set(commandName, command);
                        
                        // Extract category from folder structure
                        const category = path.relative(
                            path.join(__dirname, '..', 'commands'),
                            dir
                        ) || 'general';
                        
                        console.log(`   ├─ /${commandName} [${category}]`);
                    } else {
                        console.warn(`   ⚠️  Invalid command structure: ${fullPath}`);
                    }
                } catch (error) {
                    console.error(`   ❌ Failed to load: ${fullPath}`, error);
                }
            }
        }
    }

    /**
     * Validate that a module exports a valid SlashCommand
     */
    private isValidCommand(command: unknown): command is SlashCommand {
        return (
            typeof command === 'object' &&
            command !== null &&
            'data' in command &&
            'execute' in command &&
            typeof (command as SlashCommand).execute === 'function'
        );
    }

    /**
     * Register all loaded commands with Discord API
     */
    public async registerCommands(): Promise<void> {
        const rest = new REST({ version: '10' }).setToken(Config.DISCORD_TOKEN);
        const commandData = this.commands.map(cmd => cmd.data.toJSON());

        console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  📡 REGISTERING COMMANDS WITH DISCORD                                  ║
╚═══════════════════════════════════════════════════════════════════════╝
        `);

        try {
            // Register to specific guild for instant updates during development
            await rest.put(
                Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID),
                { body: commandData }
            );

            console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  ✅ SUCCESSFULLY REGISTERED ${String(commandData.length).padEnd(2)} COMMANDS                            ║
║  Guild: ${Config.GUILD_ID.padEnd(56)}  ║
╚═══════════════════════════════════════════════════════════════════════╝
            `);
        } catch (error) {
            console.error('❌ Failed to register commands:', error);
            throw error;
        }
    }

    /**
     * Handle incoming slash command interaction
     */
    public async handleCommand(interaction: ChatInputCommandInteraction): Promise<void> {
        const command = this.commands.get(interaction.commandName);

        if (!command) {
            await interaction.reply({
                content: '❌ Command not found.',
                ephemeral: true
            });
            return;
        }

        // Check cooldowns
        if (command.cooldown) {
            const cooldownKey = `${interaction.user.id}-${interaction.commandName}`;
            const now = Date.now();
            
            if (!this.cooldowns.has(interaction.commandName)) {
                this.cooldowns.set(interaction.commandName, new Collection());
            }

            const timestamps = this.cooldowns.get(interaction.commandName)!;
            const cooldownAmount = command.cooldown * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;

                if (now < expirationTime) {
                    const remainingTime = ((expirationTime - now) / 1000).toFixed(1);
                    await interaction.reply({
                        content: `⏳ Please wait **${remainingTime}s** before using \`/${interaction.commandName}\` again.`,
                        ephemeral: true
                    });
                    return;
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        }

        // Execute command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`❌ Error executing /${interaction.commandName}:`, error);

            const errorResponse = {
                embeds: [{
                    title: '⚠️ Command Error',
                    description: 'An unexpected error occurred while executing this command.',
                    color: BrandColors.ERROR,
                    footer: { text: 'ScrimFlow • Error logged for review' }
                }],
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorResponse);
            } else {
                await interaction.reply(errorResponse);
            }
        }
    }

    /**
     * Handle autocomplete interactions
     */
    public async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const command = this.commands.get(interaction.commandName);

        if (!command?.autocomplete) {
            return;
        }

        try {
            await command.autocomplete(interaction);
        } catch (error) {
            console.error(`❌ Autocomplete error for /${interaction.commandName}:`, error);
            await interaction.respond([]);
        }
    }

    /**
     * Get all loaded commands
     */
    public getCommands(): Collection<string, SlashCommand> {
        return this.commands;
    }

    /**
     * Get a specific command by name
     */
    public getCommand(name: string): SlashCommand | undefined {
        return this.commands.get(name);
    }
}

export default CommandHandler;
