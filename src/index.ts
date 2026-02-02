/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                         SCRIMFLOW                                      ║
 * ║            Premium Fortnite Scrim Manager Discord Bot                 ║
 * ║                                                                       ║
 * ║  "Automating registration, lobby management, and stat tracking        ║
 * ║   with zero latency for competitive esports communities."             ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import { Client, GatewayIntentBits, Events, Partials } from 'discord.js';
import { Config } from './config';
import { CommandHandler } from './handlers/CommandHandler';
import { getDatabase } from './database/Database';

// ASCII Art Banner
console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   ███████╗ ██████╗██████╗ ██╗███╗   ███╗███████╗██╗      ██████╗ ██╗    ██╗║
║   ██╔════╝██╔════╝██╔══██╗██║████╗ ████║██╔════╝██║     ██╔═══██╗██║    ██║║
║   ███████╗██║     ██████╔╝██║██╔████╔██║█████╗  ██║     ██║   ██║██║ █╗ ██║║
║   ╚════██║██║     ██╔══██╗██║██║╚██╔╝██║██╔══╝  ██║     ██║   ██║██║███╗██║║
║   ███████║╚██████╗██║  ██║██║██║ ╚═╝ ██║██║     ███████╗╚██████╔╝╚███╔███╔╝║
║   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝ ║
║                                                                           ║
║                    Premium Fortnite Scrim Manager                         ║
║                         v1.0.0 • Phase 1                                  ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);

/**
 * Initialize Discord Client with required intents
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
    ],
});

// Initialize handlers
const commandHandler = new CommandHandler(client);

// Store database reference for cleanup
let dbInstance: Awaited<ReturnType<typeof getDatabase>> | null = null;

/**
 * Client Ready Event
 * Fires when bot successfully connects to Discord
 */
client.once(Events.ClientReady, async (readyClient) => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  🚀 BOT ONLINE                                                         ║
╠═══════════════════════════════════════════════════════════════════════╣
║  Bot: ${readyClient.user.tag.padEnd(57)}  ║
║  ID:  ${readyClient.user.id.padEnd(57)}  ║
║  Guilds: ${String(readyClient.guilds.cache.size).padEnd(54)}  ║
╚═══════════════════════════════════════════════════════════════════════╝
    `);

    // Initialize database (async)
    dbInstance = await getDatabase();

    // Load and register commands
    await commandHandler.loadCommands();
    await commandHandler.registerCommands();

    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  ✅ SCRIMFLOW IS READY FOR COMPETITIVE ACTION                          ║
╚═══════════════════════════════════════════════════════════════════════╝
    `);
});

/**
 * Interaction Create Event
 * Handles all slash commands and interactions
 */
client.on(Events.InteractionCreate, async (interaction) => {
    try {
        if (interaction.isChatInputCommand()) {
            await commandHandler.handleCommand(interaction);
        } else if (interaction.isAutocomplete()) {
            await commandHandler.handleAutocomplete(interaction);
        }
    } catch (error) {
        console.error('Interaction error:', error);
    }
});

/**
 * Error Handling
 */
client.on(Events.Error, (error) => {
    console.error('Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

/**
 * Graceful Shutdown
 */
const shutdown = () => {
    console.log('\n🛑 Shutting down gracefully...');
    if (dbInstance) {
        dbInstance.close();
    }
    client.destroy();
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

/**
 * Start the bot
 */
client.login(Config.DISCORD_TOKEN);
