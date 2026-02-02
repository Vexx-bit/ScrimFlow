/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    COMMAND DEPLOYMENT SCRIPT                           ║
 * ║            Standalone script to register slash commands               ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 * 
 * Usage: npm run register
 * 
 * This script can be run independently to refresh command registrations
 * without starting the full bot.
 */

import { REST, Routes } from 'discord.js';
import { Config } from './config';
import path from 'path';
import fs from 'fs';

interface CommandData {
    name: string;
    toJSON: () => object;
}

async function loadAllCommands(): Promise<object[]> {
    const commands: object[] = [];
    const commandsPath = path.join(__dirname, 'commands');

    async function loadRecursive(dir: string): Promise<void> {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await loadRecursive(fullPath);
            } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
                try {
                    const commandModule = await import(fullPath);
                    const command = commandModule.default ?? commandModule;

                    if (command?.data?.toJSON) {
                        commands.push(command.data.toJSON());
                        console.log(`   ✓ Loaded: ${command.data.name}`);
                    }
                } catch (error) {
                    console.error(`   ✗ Failed: ${entry.name}`, error);
                }
            }
        }
    }

    await loadRecursive(commandsPath);
    return commands;
}

async function deployCommands(): Promise<void> {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║                    SCRIMFLOW COMMAND DEPLOYMENT                        ║
╚═══════════════════════════════════════════════════════════════════════╝
    `);

    console.log('📂 Loading commands...\n');
    const commands = await loadAllCommands();

    if (commands.length === 0) {
        console.log('⚠️  No commands found to deploy.');
        return;
    }

    console.log(`\n📡 Deploying ${commands.length} commands to Discord...\n`);

    const rest = new REST({ version: '10' }).setToken(Config.DISCORD_TOKEN);

    try {
        await rest.put(
            Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID),
            { body: commands }
        );

        console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  ✅ DEPLOYMENT SUCCESSFUL                                              ║
╠═══════════════════════════════════════════════════════════════════════╣
║  Commands: ${String(commands.length).padEnd(52)}  ║
║  Guild:    ${Config.GUILD_ID.padEnd(52)}  ║
║  App ID:   ${Config.APP_ID.padEnd(52)}  ║
╚═══════════════════════════════════════════════════════════════════════╝
        `);
    } catch (error) {
        console.error('❌ Deployment failed:', error);
        process.exit(1);
    }
}

deployCommands();
