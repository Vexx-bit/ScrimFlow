/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW CONFIGURATION                             ║
 * ║              Centralized Config with Validation                       ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

/**
 * Validates that a required environment variable exists
 * @throws Error with clear messaging if variable is missing
 */
function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value || value.trim() === '' || value === 'your_bot_token_here' || value === 'your_guild_id_here') {
        console.error(`
╔════════════════════════════════════════════════════════════════════════════╗
║  ⚠️  CRITICAL CONFIGURATION ERROR                                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Missing required environment variable: ${key.padEnd(30)}        ║
║                                                                            ║
║  To fix this:                                                              ║
║  1. Copy .env.example to .env                                              ║
║  2. Fill in your ${key.padEnd(45)}  ║
║  3. Restart the bot                                                        ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
        `);
        process.exit(1);
    }
    return value;
}

/**
 * ScrimFlow Brand Colors
 * "Cyber-Professional" Theme
 */
export const BrandColors = {
    /** Deep Navy Background */
    PRIMARY_BACKGROUND: 0x090912,
    /** Neon Cyan Accent */
    ACCENT_CYAN: 0x00F0FF,
    /** Success Green */
    SUCCESS: 0x00FF88,
    /** Error Red */
    ERROR: 0xFF4444,
    /** Warning Amber */
    WARNING: 0xFFAA00,
} as const;

/**
 * Competitive Regions Configuration
 * Used for ping diagnostics and player registration
 */
export const CompetitiveRegions = {
    'EU': {
        name: 'Europe',
        endpoint: 'ec2.eu-west-1.amazonaws.com',
        emoji: '🇪🇺'
    },
    'NA-East': {
        name: 'North America East',
        endpoint: 'ec2.us-east-1.amazonaws.com',
        emoji: '🇺🇸'
    },
    'NA-West': {
        name: 'North America West',
        endpoint: 'ec2.us-west-2.amazonaws.com',
        emoji: '🌴'
    },
    'ME-South': {
        name: 'Middle East',
        endpoint: 'ec2.me-south-1.amazonaws.com',
        emoji: '🏜️'
    },
    'OCE': {
        name: 'Oceania',
        endpoint: 'ec2.ap-southeast-2.amazonaws.com',
        emoji: '🦘'
    },
    'ASIA': {
        name: 'Asia Pacific',
        endpoint: 'ec2.ap-northeast-1.amazonaws.com',
        emoji: '🌏'
    },
    'BR': {
        name: 'Brazil',
        endpoint: 'ec2.sa-east-1.amazonaws.com',
        emoji: '🇧🇷'
    }
} as const;

export type RegionKey = keyof typeof CompetitiveRegions;

/**
 * Discord Application Constants
 * These are public and safe to hardcode
 */
export const DiscordApp = {
    APPLICATION_ID: '1467805177569607885',
    PUBLIC_KEY: '0eefb309386e92f75997a6a29631bb032c4cba5b41f7d724bf67c069596134bc',
} as const;

/**
 * Main Configuration Object
 * Validates all required secrets on import
 */
export const Config = {
    // Required secrets (validated on load)
    DISCORD_TOKEN: requireEnv('DISCORD_TOKEN'),
    GUILD_ID: requireEnv('GUILD_ID'),
    
    // Application constants
    APP_ID: DiscordApp.APPLICATION_ID,
    PUBLIC_KEY: DiscordApp.PUBLIC_KEY,
    
    // Database configuration
    DATABASE_PATH: path.join(process.cwd(), 'data.db'),
    
    // Environment
    NODE_ENV: process.env['NODE_ENV'] ?? 'development',
    IS_PRODUCTION: process.env['NODE_ENV'] === 'production',
} as const;

export default Config;
