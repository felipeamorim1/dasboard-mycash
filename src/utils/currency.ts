/**
 * Currency formatting utilities for Brazilian Real (BRL)
 */

/**
 * Formats a number as Brazilian currency (R$)
 * 
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
 * 
 * @example
 * formatCurrency(1234.56) // "R$ 1.234,56"
 * formatCurrency(0) // "R$ 0,00"
 * formatCurrency(-500) // "-R$ 500,00"
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formats a number as compact Brazilian currency (K, M, B notation)
 * 
 * @param {number} value - The numeric value to format
 * @returns {string} Compact currency string (e.g., "R$ 1,2 mil", "R$ 3,4 mi")
 * 
 * @example
 * formatCompactCurrency(1234) // "R$ 1,2 mil"
 * formatCompactCurrency(1234567) // "R$ 1,2 mi"
 * formatCompactCurrency(1234567890) // "R$ 1,2 bi"
 */
export function formatCompactCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        notation: 'compact',
        compactDisplay: 'short'
    }).format(value);
}
