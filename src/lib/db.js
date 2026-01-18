// ⚠️ SECURITY WARNING: This file allows direct database access with privileged credentials.
// It is intended for SERVER-SIDE use only (e.g. migrations, seed scripts, API routes).
// DO NOT import this file into React components or any Client-side code.

import postgres from 'postgres'

// Load environment variables if running in Node.js context (requires dotenv if not using --env-file)
// For Vite, this variable must be loaded from .env but NOT prefixed with VITE_ to keep it private.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.warn("⚠️ DATABASE_URL not found in environment variables.");
}

const sql = postgres(connectionString || '')

export default sql
