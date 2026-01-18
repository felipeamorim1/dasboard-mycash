import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type {
    Transaction,
    FamilyMember,
    Account,
    Category,
    Goal,
    TransactionType
} from '../types';

interface Filters {
    selectedMember: string | 'all';
    dateRange: { start: Date; end: Date };
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
    accounts: Account[];
    creditCards: Account[]; // Filtered accounts onde type='CREDIT_CARD'
    bankAccounts: Account[]; // Filtered accounts onde type='CHECKING' ou 'SAVINGS'
    categories: Category[];
    goals: Goal[];

    // Loading & Error States
    isLoading: boolean;
    error: string | null;

    // Filters
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;

    // Derived State (Calculated)
    filteredTransactions: Transaction[];
    upcomingExpenses: Transaction[];
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    expensesByCategory: CategorySummary[];

    // CRUD Actions
    addTransaction: (tx: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTransaction: (id: string, tx: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    markAsPaid: (id: string) => Promise<void>;

    addMember: (member: Omit<FamilyMember, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;

    addAccount: (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    addCard: (card: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;

    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, goal: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;

    // Helpers
    getMemberName: (id: string) => string;

    // Refresh data manually
    refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Temporary User ID (em produção, virá do auth)
const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001';

export function FinanceProvider({ children }: { children: ReactNode }) {
    // --- STATE ---
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<Filters>({
        selectedMember: 'all',
        dateRange: {
            start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end: new Date()
        },
        transactionType: 'all',
        searchText: ''
    });

    // --- DATA FETCHING FROM SUPABASE ---
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch all data in parallel
            const [
                { data: membersData, error: membersError },
                { data: accountsData, error: accountsError },
                { data: categoriesData, error: categoriesError },
                { data: transactionsData, error: transactionsError },
                { data: goalsData, error: goalsError }
            ] = await Promise.all([
                supabase.from('family_members').select('*').eq('user_id', TEMP_USER_ID).order('created_at', { ascending: true }),
                supabase.from('accounts').select('*').eq('user_id', TEMP_USER_ID).order('created_at', { ascending: true }),
                supabase.from('categories').select('*').eq('user_id', TEMP_USER_ID).order('name', { ascending: true }),
                supabase.from('transactions').select('*').eq('user_id', TEMP_USER_ID).order('date', { ascending: false }),
                supabase.from('goals').select('*').eq('user_id', TEMP_USER_ID).eq('is_active', true)
            ]) as [
                    { data: any[] | null; error: any },
                    { data: any[] | null; error: any },
                    { data: any[] | null; error: any },
                    { data: any[] | null; error: any },
                    { data: any[] | null; error: any }
                ];

            // Check for errors
            if (membersError) throw new Error(`Members: ${membersError.message}`);
            if (accountsError) throw new Error(`Accounts: ${accountsError.message}`);
            if (categoriesError) throw new Error(`Categories: ${categoriesError.message}`);
            if (transactionsError) throw new Error(`Transactions: ${transactionsError.message}`);
            if (goalsError) throw new Error(`Goals: ${goalsError.message}`);

            // Convert snake_case do banco para camelCase do frontend
            setMembers((membersData || []).map(m => ({
                id: m.id,
                userId: m.user_id,
                name: m.name,
                role: m.role,
                avatarUrl: m.avatar_url,
                monthlyIncome: Number(m.monthly_income),
                color: m.color,
                isActive: m.is_active,
                createdAt: m.created_at,
                updatedAt: m.updated_at
            })));

            setAccounts((accountsData || []).map(a => ({
                id: a.id,
                userId: a.user_id,
                type: a.type,
                name: a.name,
                bank: a.bank,
                lastDigits: a.last_digits,
                holderId: a.holder_id,
                balance: Number(a.balance),
                creditLimit: a.credit_limit ? Number(a.credit_limit) : null,
                currentBill: Number(a.current_bill),
                dueDay: a.due_day,
                closingDay: a.closing_day,
                theme: a.theme,
                logoUrl: a.logo_url,
                color: a.color,
                isActive: a.is_active,
                createdAt: a.created_at,
                updatedAt: a.updated_at
            })));

            setCategories((categoriesData || []).map(c => ({
                id: c.id,
                userId: c.user_id,
                name: c.name,
                icon: c.icon,
                type: c.type,
                color: c.color,
                isActive: c.is_active,
                createdAt: c.created_at,
                updatedAt: c.updated_at
            })));

            setGoals((goalsData || []).map(g => ({
                id: g.id,
                userId: g.user_id,
                name: g.name,
                targetAmount: Number(g.target_amount),
                currentAmount: Number(g.current_amount),
                deadline: g.deadline,
                icon: g.icon,
                color: g.color,
                isActive: g.is_active,
                createdAt: g.created_at,
                updatedAt: g.updated_at
            })));

            setTransactions((transactionsData || []).map(t => ({
                id: t.id,
                userId: t.user_id,
                type: t.type,
                amount: Number(t.amount),
                description: t.description,
                date: t.date,
                categoryId: t.category_id,
                accountId: t.account_id,
                memberId: t.member_id,
                installmentNumber: t.installment_number,
                totalInstallments: t.total_installments,
                parentTransactionId: t.parent_transaction_id,
                isRecurring: t.is_recurring,
                recurringTransactionId: t.recurring_transaction_id,
                status: t.status,
                notes: t.notes,
                createdAt: t.created_at,
                updatedAt: t.updated_at
            })));

        } catch (err) {
            console.error('Error fetching data from Supabase:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData();
    }, []);

    // --- DERIVED STATE ---
    const creditCards = accounts.filter(a => a.type === 'CREDIT_CARD');
    const bankAccounts = accounts.filter(a => a.type === 'CHECKING' || a.type === 'SAVINGS');

    const filteredTransactions = transactions.filter(tx => {
        if (filters.selectedMember !== 'all' && tx.memberId !== filters.selectedMember) return false;
        if (filters.transactionType !== 'all' && tx.type !== filters.transactionType) return false;
        if (filters.searchText && !tx.description.toLowerCase().includes(filters.searchText.toLowerCase())) return false;
        return true;
    });

    const upcomingExpenses = transactions
        .filter(t => t.status === 'PENDING')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalIncome = filteredTransactions
        .filter(t => t.type === 'INCOME' && t.status !== 'PENDING')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = filteredTransactions
        .filter(t => t.type === 'EXPENSE' && t.status !== 'PENDING')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    const expensesByCategory = (() => {
        const expenses = filteredTransactions.filter(t => t.type === 'EXPENSE' && t.status !== 'PENDING');
        const grouped: Record<string, number> = {};

        expenses.forEach(tx => {
            const category = categories.find(c => c.id === tx.categoryId);
            const catName = category?.name || 'Sem categoria';
            grouped[catName] = (grouped[catName] || 0) + tx.amount;
        });

        const colors = ['#CCFF00', '#000000', '#9CA3AF'];

        return Object.entries(grouped)
            .map(([category, amount], index) => ({
                category,
                amount,
                percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
                color: colors[index % colors.length]
            }))
            .sort((a, b) => b.amount - a.amount);
    })();

    // --- CRUD ACTIONS ---
    const addTransaction = async (tx: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        try {
            // @ts-ignore - Supabase type inference issue
            const { error } = await (supabase.from('transactions').insert({
                user_id: TEMP_USER_ID,
                type: tx.type,
                amount: tx.amount,
                description: tx.description,
                date: tx.date,
                category_id: tx.categoryId,
                account_id: tx.accountId,
                member_id: tx.memberId,
                installment_number: tx.installmentNumber,
                total_installments: tx.totalInstallments,
                parent_transaction_id: tx.parentTransactionId,
                is_recurring: tx.isRecurring,
                recurring_transaction_id: tx.recurringTransactionId,
                status: tx.status,
                notes: tx.notes
            }).select().single() as any);

            if (error) throw error;
            await fetchData(); // Refresh data
        } catch (err) {
            console.error('Error adding transaction:', err);
            throw err;
        }
    };

    const updateTransaction = async (id: string, updatedTx: Partial<Transaction>) => {
        try {
            const updates: any = {};
            if (updatedTx.type !== undefined) updates.type = updatedTx.type;
            if (updatedTx.amount !== undefined) updates.amount = updatedTx.amount;
            if (updatedTx.description !== undefined) updates.description = updatedTx.description;
            if (updatedTx.date !== undefined) updates.date = updatedTx.date;
            if (updatedTx.categoryId !== undefined) updates.category_id = updatedTx.categoryId;
            if (updatedTx.accountId !== undefined) updates.account_id = updatedTx.accountId;
            if (updatedTx.memberId !== undefined) updates.member_id = updatedTx.memberId;
            if (updatedTx.status !== undefined) updates.status = updatedTx.status;
            if (updatedTx.notes !== undefined) updates.notes = updatedTx.notes;

            //  @ts-ignore - Supabase type inference issue
            const { error } = await (supabase.from('transactions').update(updates).eq('id', id) as any);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error('Error updating transaction:', err);
            throw err;
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            const { error } = await supabase.from('transactions').delete().eq('id', id);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error('Error deleting transaction:', err);
            throw err;
        }
    };

    const markAsPaid = async (id: string) => {
        await updateTransaction(id, { status: 'COMPLETED' });
    };

    const addMember = async (member: Omit<FamilyMember, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        try {
            // @ts-ignore - Supabase type inference issue
            const { error } = await (supabase.from('family_members').insert({
                user_id: TEMP_USER_ID,
                name: member.name,
                role: member.role,
                avatar_url: member.avatarUrl,
                monthly_income: member.monthlyIncome,
                color: member.color,
                is_active: member.isActive
            }) as any);

            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error('Error adding member:', err);
            throw err;
        }
    };

    const addAccount = async (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        try {
            // @ts-ignore - Supabase type inference issue
            const { error } = await (supabase.from('accounts').insert({
                user_id: TEMP_USER_ID,
                type: account.type,
                name: account.name,
                bank: account.bank,
                last_digits: account.lastDigits,
                holder_id: account.holderId,
                balance: account.balance,
                credit_limit: account.creditLimit,
                current_bill: account.currentBill,
                due_day: account.dueDay,
                closing_day: account.closingDay,
                theme: account.theme,
                logo_url: account.logoUrl,
                color: account.color,
                is_active: account.isActive
            }) as any);

            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error('Error adding account:', err);
            throw err;
        }
    };

    const addCard = async (card: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        await addAccount({ ...card, type: 'CREDIT_CARD' });
    };

    // Goals ainda ficam em localStorage (não estão no schema do banco)
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

    const getMemberName = (id: string) => members.find(m => m.id === id)?.name || 'Desconhecido';

    const refreshData = async () => {
        await fetchData();
    };

    return (
        <FinanceContext.Provider value={{
            transactions,
            members,
            accounts,
            creditCards,
            bankAccounts,
            categories,
            goals,
            isLoading,
            error,
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
            getMemberName,
            refreshData
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
