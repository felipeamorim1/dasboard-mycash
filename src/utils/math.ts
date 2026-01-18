/**
 * Mathematical calculation utilities for financial operations
 */

/**
 * Calculates the percentage value of a number relative to a total
 * 
 * @param {number} value - The partial value
 * @param {number} total - The total value (100%)
 * @returns {number} Percentage value (0-100), or 0 if total is zero
 * 
 * @example
 * calculatePercentage(25, 100) // 25
 * calculatePercentage(500, 2000) // 25
 * calculatePercentage(0, 100) // 0
 * calculatePercentage(100, 0) // 0 (safe handling)
 */
export function calculatePercentage(value: number, total: number): number {
    if (total === 0 || isNaN(total) || isNaN(value)) return 0;
    const result = (value / total) * 100;
    return Math.round(result * 100) / 100; // Round to 2 decimals
}

/**
 * Calculates the value of each installment for a financed amount
 * 
 * @param {number} totalAmount - The total amount to be financed
 * @param {number} installments - Number of installments
 * @returns {number} Value of each installment (rounded to 2 decimal places)
 * 
 * @example
 * calculateInstallmentValue(1000, 10) // 100.00
 * calculateInstallmentValue(1000, 3) // 333.33
 * calculateInstallmentValue(250, 5) // 50.00
 * calculateInstallmentValue(1000, 0) // 1000.00 (safe handling)
 */
export function calculateInstallmentValue(totalAmount: number, installments: number): number {
    if (installments <= 0 || isNaN(installments) || isNaN(totalAmount)) {
        return totalAmount;
    }
    return Math.round((totalAmount / installments) * 100) / 100;
}
