/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIMFLOW DATABASE                                  ║
 * ║           High-Performance SQLite with sql.js                         ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

// @ts-ignore - sql.js doesn't have type definitions
import initSqlJs from 'sql.js';
import { Config } from '../config';
import fs from 'fs';
import path from 'path';

// Type definitions for sql.js
interface SqlJsDatabase {
    run(sql: string, params?: unknown[]): void;
    exec(sql: string): void;
    prepare(sql: string): SqlJsStatement;
    export(): Uint8Array;
    close(): void;
}

interface SqlJsStatement {
    bind(params?: unknown[]): boolean;
    step(): boolean;
    getAsObject(): Record<string, unknown>;
    free(): void;
}

/**
 * User record structure for competitive players
 */
export interface UserRecord {
    discord_id: string;
    epic_name: string;
    earnings: number;
    region: string;
    registered_at?: string;
}

/**
 * Singleton Database Class
 * Manages all database operations with auto-save functionality
 */
class Database {
    private static instance: Database | null = null;
    private static initPromise: Promise<Database> | null = null;
    private db!: SqlJsDatabase;
    private saveTimeout: ReturnType<typeof setTimeout> | null = null;

    private constructor() {}

    /**
     * Initialize the database asynchronously
     */
    private async initialize(): Promise<void> {
        const SQL = await initSqlJs();

        // Load existing database or create new one
        if (fs.existsSync(Config.DATABASE_PATH)) {
            const fileBuffer = fs.readFileSync(Config.DATABASE_PATH);
            this.db = new SQL.Database(fileBuffer) as SqlJsDatabase;
            console.log('📦 Loaded existing database from disk.');
        } else {
            this.db = new SQL.Database() as SqlJsDatabase;
            console.log('📦 Created new database.');
        }

        // Initialize tables
        this.initializeTables();

        console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║  📦 DATABASE INITIALIZED                                               ║
╠═══════════════════════════════════════════════════════════════════════╣
║  Path: ${Config.DATABASE_PATH.substring(0, 50).padEnd(56)}  ║
║  Engine: sql.js (Pure JavaScript SQLite)                               ║
║  Status: Ready for operations                                          ║
╚═══════════════════════════════════════════════════════════════════════╝
        `);
    }

    /**
     * Get the singleton database instance (async)
     */
    public static async getInstance(): Promise<Database> {
        if (Database.instance) {
            return Database.instance;
        }

        if (!Database.initPromise) {
            Database.initPromise = (async () => {
                const db = new Database();
                await db.initialize();
                Database.instance = db;
                return db;
            })();
        }

        return Database.initPromise;
    }

    /**
     * Initialize all required tables
     */
    private initializeTables(): void {
        // Users table - Core player data for competitive tracking
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                discord_id TEXT PRIMARY KEY,
                epic_name TEXT NOT NULL,
                earnings REAL DEFAULT 0.0,
                region TEXT NOT NULL,
                registered_at TEXT DEFAULT (datetime('now'))
            )
        `);

        // Create indexes
        this.db.run(`
            CREATE INDEX IF NOT EXISTS idx_users_earnings 
            ON users(earnings DESC)
        `);

        this.db.run(`
            CREATE INDEX IF NOT EXISTS idx_users_region 
            ON users(region)
        `);

        // Save after initialization
        this.saveToDisk();
    }

    /**
     * Schedule a save to disk (debounced for performance)
     */
    private scheduleSave(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(() => {
            this.saveToDisk();
        }, 1000); // Save 1 second after last write
    }

    /**
     * Save database to disk immediately
     */
    public saveToDisk(): void {
        try {
            const data = this.db.export();
            const buffer = Buffer.from(data);
            
            // Ensure directory exists
            const dir = path.dirname(Config.DATABASE_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFileSync(Config.DATABASE_PATH, buffer);
        } catch (error) {
            console.error('❌ Failed to save database:', error);
        }
    }

    /**
     * Register a new player or update existing
     * @returns true if new registration, false if update
     */
    public registerUser(discordId: string, epicName: string, region: string): { isNew: boolean; user: UserRecord } {
        const existing = this.getUser(discordId);
        
        this.db.run(`
            INSERT OR REPLACE INTO users (discord_id, epic_name, region, earnings, registered_at)
            VALUES (?, ?, ?, COALESCE((SELECT earnings FROM users WHERE discord_id = ?), 0), datetime('now'))
        `, [discordId, epicName, region, discordId]);

        this.scheduleSave();

        const user = this.getUser(discordId)!;
        return { isNew: !existing, user };
    }

    /**
     * Delete a user by Discord ID
     * Used for unregistration/fixing mistakes
     */
    public deleteUser(discordId: string): void {
        this.db.run(`DELETE FROM users WHERE discord_id = ?`, [discordId]);
        this.scheduleSave();
    }

    /**
     * Get a user by Discord ID
     */
    public getUser(discordId: string): UserRecord | undefined {
        const stmt = this.db.prepare(`SELECT * FROM users WHERE discord_id = ?`);
        stmt.bind([discordId]);
        
        if (stmt.step()) {
            const row = stmt.getAsObject() as unknown as UserRecord;
            stmt.free();
            return row;
        }
        
        stmt.free();
        return undefined;
    }

    /**
     * Get user by Epic Games name
     */
    public getUserByEpicName(epicName: string): UserRecord | undefined {
        const stmt = this.db.prepare(`SELECT * FROM users WHERE epic_name = ? COLLATE NOCASE`);
        stmt.bind([epicName]);
        
        if (stmt.step()) {
            const row = stmt.getAsObject() as unknown as UserRecord;
            stmt.free();
            return row;
        }
        
        stmt.free();
        return undefined;
    }

    /**
     * Update player earnings
     */
    public updateEarnings(discordId: string, amount: number): void {
        this.db.run(`UPDATE users SET earnings = earnings + ? WHERE discord_id = ?`, [amount, discordId]);
        this.scheduleSave();
    }

    /**
     * Get regional leaderboard
     */
    public getLeaderboard(region?: string, limit: number = 10): UserRecord[] {
        let query: string;
        let params: (string | number)[];

        if (region) {
            query = `SELECT * FROM users WHERE region = ? ORDER BY earnings DESC LIMIT ?`;
            params = [region, limit];
        } else {
            query = `SELECT * FROM users ORDER BY earnings DESC LIMIT ?`;
            params = [limit];
        }

        const results: UserRecord[] = [];
        const stmt = this.db.prepare(query);
        stmt.bind(params);

        while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as UserRecord);
        }
        
        stmt.free();
        return results;
    }

    /**
     * Get total registered player count
     */
    public getPlayerCount(): number {
        const stmt = this.db.prepare(`SELECT COUNT(*) as count FROM users`);
        stmt.step();
        const result = stmt.getAsObject() as { count: number };
        stmt.free();
        return result.count;
    }

    /**
     * Get players by region
     */
    public getPlayersByRegion(region: string): UserRecord[] {
        const results: UserRecord[] = [];
        const stmt = this.db.prepare(`SELECT * FROM users WHERE region = ? ORDER BY earnings DESC`);
        stmt.bind([region]);

        while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as UserRecord);
        }
        
        stmt.free();
        return results;
    }

    /**
     * Close database connection gracefully
     */
    public close(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveToDisk();
        this.db.close();
        Database.instance = null;
        Database.initPromise = null;
        console.log('📦 Database connection closed.');
    }
}

// Export async getter
export const getDatabase = () => Database.getInstance();
export default Database;
