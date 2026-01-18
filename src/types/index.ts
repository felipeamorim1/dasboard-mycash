export type TransactionType = 'income' | 'expense';

export interface FamilyMember {
    id: string;
    name: string;
    role: 'admin' | 'member';
    avatarUrl: string;
    income?: number;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountType: 'checking' | 'savings' | 'investment';
    balance: number;
    color: string; // Hex color for UI representation
    icon?: string; // Icon identifier
}

export interface CreditCard {
    id: string;
    name: string;
    brand: 'visa' | 'mastercard' | 'amex' | 'elo';
    limit: number;
    currentBill: number;
    dueDate: number; // Day of month
    closingDate: number; // Day of month
    last4Digits: string;
    color: string;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string; // ISO Date
    icon?: string;
    color: string;
}

export interface Category {
    id: string;
    name: string;
    type: TransactionType;
    color: string;
    budget?: number; // Optional monthly budget
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    date: string; // ISO Date
    category: Category | string; // Can be object or just name for simple cases
    memberId?: string; // Who made the transaction
    accountId?: string; // Which account used
    cardId?: string; // If credit card was used
    isRecurring?: boolean;
    installments?: string; // e.g. "1/10"
    status?: 'pending' | 'completed'; // For upcoming expenses
}
