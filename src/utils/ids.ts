/**
 * Unique identifier generation utilities
 */

/**
 * Generates a unique identifier (UUID v4 format)
 * 
 * @returns {string} A UUID string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 * 
 * @example
 * generateUniqueId() // "a3bb189e-8bf9-3888-9912-ace4e6543002"
 * generateUniqueId() // "c56a4180-65aa-42ec-a945-5fd21dec0538"
 * 
 * @note Uses crypto.randomUUID() when available (modern browsers),
 * falls back to Math.random() for compatibility
 */
export function generateUniqueId(): string {
    // Use native crypto.randomUUID if available (modern browsers)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Fallback: Generate UUID v4 format manually
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
