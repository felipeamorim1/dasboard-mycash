import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Transaction, FamilyMember, BankAccount, CreditCard, Goal, TransactionType } from '../types';

// Extend Transaction to handle category as string or object internally if needed,
// but for state we assume it matches the type definition.

interface Filters {
    selectedMember: string | 'all';
    dateRange: { start: Date; end: Date }; // Simplified for now
    transactionType: TransactionType | 'all';
    searchText: string;
}

export interface CategorySummary {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

interface FinanceContextType {
    // Data
    transactions: Transaction[];
    members: FamilyMember[];
    accounts: BankAccount[];
    creditCards: CreditCard[];
    goals: Goal[];

    // Filters
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;

    // Derived State (Calculated)
    filteredTransactions: Transaction[];
    upcomingExpenses: Transaction[]; // New
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    expensesByCategory: CategorySummary[];

    // CRUD Actions
    addTransaction: (tx: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, tx: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    markAsPaid: (id: string) => void; // New action

    addMember: (member: Omit<FamilyMember, 'id'>) => void;

    addAccount: (account: Omit<BankAccount, 'id'>) => void;
    addCard: (card: Omit<CreditCard, 'id'>) => void;

    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, goal: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;

    // Helpers
    getMemberName: (id: string) => string;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    // --- STATE ---
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    const [filters, setFilters] = useState<Filters>({
        selectedMember: 'all',
        dateRange: { start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() }, // Default to current month start
        transactionType: 'all',
        searchText: ''
    });

    // --- MOCK DATA INITIALIZATION ---
    useEffect(() => {
        // 1. Members
        const mockMembers: FamilyMember[] = [
            { id: 'm1', name: 'Felipe Amorim', role: 'admin', avatarUrl: 'https://ui-avatars.com/api/?name=Felipe+Amorim&background=ccff00&color=000000' },
            { id: 'm2', name: 'Ana Silva', role: 'member', avatarUrl: 'https://ui-avatars.com/api/?name=Ana+Silva&background=random' },
            { id: 'm3', name: 'Joãozinho', role: 'member', avatarUrl: 'https://ui-avatars.com/api/?name=Joao+Silva&background=random' },
        ];

        // 2. Accounts
        const mockAccounts: BankAccount[] = [
            { id: 'acc1', bankName: 'Nubank', accountType: 'checking', balance: 5245.00, color: '#8A05BE', icon: 'nu' },
            { id: 'acc2', bankName: 'Inter', accountType: 'checking', balance: 1500.00, color: '#FF7A00', icon: 'inter' },
            { id: 'acc3', bankName: 'XP Investimentos', accountType: 'investment', balance: 15000.00, color: '#000000', icon: 'xp' },
        ];

        // 3. Cards
        const mockCards: CreditCard[] = [
            { id: 'card1', name: 'Nubank Platinum', brand: 'mastercard', limit: 8000, currentBill: 2450.50, dueDate: 10, closingDate: 3, last4Digits: '5897', color: '#8A05BE' },
            { id: 'card2', name: 'Inter Black', brand: 'mastercard', limit: 12000, currentBill: 980.00, dueDate: 15, closingDate: 8, last4Digits: '4765', color: '#FF7A00' },
            { id: 'card3', name: 'XP Visão', brand: 'visa', limit: 25000, currentBill: 3400.00, dueDate: 20, closingDate: 13, last4Digits: '2356', color: '#000000' },
        ];

        // 4. Goals
        const mockGoals: Goal[] = [
            { id: 'g1', name: 'Viagem Disney', targetAmount: 20000, currentAmount: 5000, deadline: '2026-12-01', color: '#ccff00', icon: 'plane' },
            { id: 'g2', name: 'Reserva Emergência', targetAmount: 50000, currentAmount: 15000, deadline: '2025-12-01', color: '#22c55e', icon: 'shield' },
        ];

        // 5. Transactions (30 realistic items)
        const categories = ['Alimentação', 'Transporte', 'Lazer', 'Contas', 'Educação', 'Investimento', 'Saúde'];
        const mockTransactions: Transaction[] = Array.from({ length: 30 }).map((_, i) => {
            const isIncome = Math.random() > 0.7;
            const amount = isIncome ? Math.random() * 5000 + 1000 : Math.random() * 300 + 20;
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));

            return {
                id: `tx${i + 1}`,
                description: isIncome ? `Receita ${i + 1}` : `Despesa ${i + 1}`,
                amount: Number(amount.toFixed(2)),
                type: (isIncome ? 'income' : 'expense') as TransactionType,
                category: categories[Math.floor(Math.random() * categories.length)],
                date: date.toISOString(),
                memberId: mockMembers[Math.floor(Math.random() * mockMembers.length)].id,
                status: 'completed' as const, // Explicitly cast to literal
                installments: !isIncome && Math.random() > 0.8 ? `${Math.floor(Math.random() * 10) + 1}/12` : undefined // Randomly add installments
            };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Add some pending expenses (Upcoming)
        const pendingExpenses: Transaction[] = [
            { id: 'p1', description: 'Netflix', amount: 55.90, type: 'expense', status: 'pending', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), category: 'Lazer', memberId: 'm1', isRecurring: true },
            { id: 'p2', description: 'Conta de Luíza', amount: 350.00, type: 'expense', status: 'pending', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), category: 'Contas', memberId: 'm1' },
            { id: 'p3', description: 'Condomínio', amount: 850.00, type: 'expense', status: 'pending', date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), category: 'Contas', memberId: 'm1' },
        ];

        setMembers(mockMembers);
        setAccounts(mockAccounts);
        setCreditCards(mockCards);
        setGoals(mockGoals);
        setTransactions([...mockTransactions, ...pendingExpenses]);

    }, []);

    // --- DERIVED STATE ---
    const filteredTransactions = transactions.filter(tx => {
        // 1. Filter by Member
        if (filters.selectedMember !== 'all' && tx.memberId !== filters.selectedMember) return false;

        // 2. Filter by Type
        if (filters.transactionType !== 'all' && tx.type !== filters.transactionType) return false;

        // 3. Filter by Search
        if (filters.searchText && !tx.description.toLowerCase().includes(filters.searchText.toLowerCase())) return false;

        // 4. Date Range (Optional for now, implementation depends on date picker)
        return true;
    });

    // Upcoming Expenses (Pending only, sorted by date asc)
    const upcomingExpenses = transactions
        .filter(t => t.status === 'pending')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalIncome = filteredTransactions
        .filter(t => t.type === 'income' && t.status !== 'pending') // Only count completed income
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = filteredTransactions
        .filter(t => t.type === 'expense' && t.status !== 'pending') // Only count completed expenses
        .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses; // Or calculate from accounts sum if preferred

    const expensesByCategory = (() => {
        const expenses = filteredTransactions.filter(t => t.type === 'expense' && t.status !== 'pending'); // Only completed expenses
        const grouped: Record<string, number> = {};

        expenses.forEach(tx => {
            const catName = typeof tx.category === 'string' ? tx.category : tx.category.name;
            grouped[catName] = (grouped[catName] || 0) + tx.amount;
        });

        const colors = ['#CCFF00', '#000000', '#9CA3AF']; // Lime, Black, Gray

        return Object.entries(grouped)
            .map(([category, amount], index) => ({
                category,
                amount,
                percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
                color: colors[index % colors.length]
            }))
            .sort((a, b) => b.amount - a.amount);
    })();

    // --- ACTIONS (CRUD) ---
    const addTransaction = (tx: Omit<Transaction, 'id'>) => {
        const newTx = { ...tx, id: Math.random().toString(36).substr(2, 9) };
        setTransactions(prev => [newTx, ...prev]);
    };

    const updateTransaction = (id: string, updatedTx: Partial<Transaction>) => {
        setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...updatedTx } : tx));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
    };

    const markAsPaid = (id: string) => {
        setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, status: 'completed' } : tx));
    };

    const addMember = (member: Omit<FamilyMember, 'id'>) => {
        const newMember = { ...member, id: Math.random().toString(36).substr(2, 9) };
        setMembers(prev => [...prev, newMember]);
    };

    const addAccount = (account: Omit<BankAccount, 'id'>) => {
        const newAccount = { ...account, id: Math.random().toString(36).substr(2, 9) };
        setAccounts(prev => [...prev, newAccount]);
    };

    const addCard = (card: Omit<CreditCard, 'id'>) => {
        const newCard = { ...card, id: Math.random().toString(36).substr(2, 9) };
        setCreditCards(prev => [...prev, newCard]);
    };

    const addGoal = (goal: Omit<Goal, 'id'>) => {
        const newGoal = { ...goal, id: Math.random().toString(36).substr(2, 9) };
        setGoals(prev => [...prev, newGoal]);
    };

    const updateGoal = (id: string, updatedGoal: Partial<Goal>) => {
        setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updatedGoal } : g));
    };

    const deleteGoal = (id: string) => {
        setGoals(prev => prev.filter(g => g.id !== id));
    };

    // --- HELPERS ---
    const getMemberName = (id: string) => members.find(m => m.id === id)?.name || 'Desconhecido';

    return (
        <FinanceContext.Provider value={{
            transactions,
            members,
            accounts,
            creditCards,
            goals,
            filters,
            setFilters,
            filteredTransactions,
            totalBalance,
            totalIncome,
            totalExpenses,
            expensesByCategory,
            upcomingExpenses,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            markAsPaid,
            addMember,
            addAccount,
            addCard,
            addGoal,
            updateGoal,
            deleteGoal,
            getMemberName
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
