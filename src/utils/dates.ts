/**
 * Date formatting utilities for Brazilian Portuguese locale
 */

/**
 * Formats a date to Brazilian format (DD/MM/AAAA)
 * 
 * @param {Date | string} date - Date object or ISO string to format
 * @returns {string} Formatted date string (e.g., "18/01/2026")
 * 
 * @example
 * formatDate(new Date('2026-01-18')) // "18/01/2026"
 * formatDate('2026-01-18T10:30:00Z') // "18/01/2026"
 */
export function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(dateObj);
}

/**
 * Formats a date as a relative string (Hoje, Ontem, or DD/MM/AAAA)
 * 
 * @param {Date | string} date - Date object or ISO string to format
 * @returns {string} Relative date string (e.g., "Hoje", "Ontem", "16/01/2026")
 * 
 * @example
 * // If today is 2026-01-18
 * formatRelativeDate(new Date('2026-01-18')) // "Hoje"
 * formatRelativeDate(new Date('2026-01-17')) // "Ontem"
 * formatRelativeDate(new Date('2026-01-16')) // "16/01/2026"
 */
export function formatRelativeDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();

    // Reset time to midnight for accurate day comparison
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateMidnight = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    // Calculate difference in days
    const diffTime = todayMidnight.getTime() - dateMidnight.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Hoje';
    } else if (diffDays === 1) {
        return 'Ontem';
    } else {
        return formatDate(dateObj);
    }
}
