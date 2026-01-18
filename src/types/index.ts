// ============================================
// 🔧 ENUMS
// ============================================

export type TransactionType = 'INCOME' | 'EXPENSE';
export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD';
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type TransactionStatus = 'PENDING' | 'COMPLETED';

// ============================================
// 👤 USER
// ============================================

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 👨👩👧👦 FAMILY MEMBER
// ============================================

export interface FamilyMember {
    id: string;
    userId: string;
    name: string;
    role: string; // "Pai", "Mãe", "Filho", "Filha", "Avô", "Avó", etc
    avatarUrl: string | null;
    monthlyIncome: number;
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 🏷️ CATEGORY
// ============================================

export interface Category {
    id: string;
    userId: string;
    name: string;
    icon: string;
    type: TransactionType;
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 💳 ACCOUNT (Unificado: Conta + Cartão)
// ============================================

export interface Account {
    id: string;
    userId: string;
    type: AccountType;
    name: string;
    bank: string;
    lastDigits: string | null;
    holderId: string;

    // Campos para conta corrente/poupança
    balance: number;

    // Campos para cartão de crédito
    creditLimit: number | null;
    currentBill: number;
    dueDay: number | null;
    closingDay: number | null;
    theme: string | null;
    logoUrl: string | null;

    // Metadata
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 💰 TRANSACTION
// ============================================

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
    categoryId: string | null;
    accountId: string | null;
    memberId: string | null;

    // Parcelamento
    installmentNumber: number | null;
    totalInstallments: number;
    parentTransactionId: string | null;

    // Recorrência
    isRecurring: boolean;
    recurringTransactionId: string | null;

    // Status
    status: TransactionStatus;
    notes: string | null;

    // Metadata
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 💫 RECURRING TRANSACTION
// ============================================

export interface RecurringTransaction {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;
    description: string;
    categoryId: string | null;
    accountId: string | null;
    memberId: string | null;

    // Configuração de recorrência
    frequency: RecurrenceFrequency;
    dayOfMonth: number | null;
    dayOfWeek: number | null;
    startDate: string;
    endDate: string | null;

    // Metadata
    isActive: boolean;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// 🎯 GOAL (Mantido para compatibilidade)
// ============================================

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    icon?: string;
    color: string;
}

// ============================================
// 📊 LEGACY TYPES (Para compatibilidade com código antigo)
// ============================================
// Estes types serão removidos gradualmente

/** @deprecated Use Account com type='CHECKING' ou 'SAVINGS' */
export interface BankAccount {
    id: string;
    bankName: string;
    accountType: 'checking' | 'savings' | 'investment';
    balance: number;
    color: string;
    icon?: string;
}

/** @deprecated Use Account com type='CREDIT_CARD' */
export interface CreditCard {
    id: string;
    name: string;
    brand: 'visa' | 'mastercard' | 'amex' | 'elo';
    limit: number;
    currentBill: number;
    dueDate: number;
    closingDate: number;
    last4Digits: string;
    color: string;
}

// ============================================
// 🔄 HELPER TYPES
// ============================================

// Para campos que podem aceitar Category completa ou só string
export type CategoryField = Category | string;

// Para transações com informações expandidas
export interface TransactionWithRelations extends Transaction {
    category?: Category;
    account?: Account;
    member?: FamilyMember;
}
