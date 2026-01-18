import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ArrowUpCircle,
    ArrowDownCircle,
    CreditCard,
    Wallet
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import type { Transaction } from '../../types';

interface TransactionTableProps {
    overrideTransactions?: Transaction[];
}

export function TransactionTable({ overrideTransactions }: TransactionTableProps) {
    const { filteredTransactions, members, accounts, creditCards } = useFinance();

    // Use override if provided, otherwise use filtered
    const transactions = overrideTransactions || filteredTransactions;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter out pending for the statement table usually? 
    // The prompt implies "Extrato" (Statement), which usually implies completed transactions. 
    // But the prompt says "Combine global search, context filters...". 
    // I will use `filteredTransactions` but maybe filter out 'pending' if they clutter, 
    // OR just show them with a status indicator.
    // Given Prompt 15 handled "Upcoming", "Extrato" usually means History. 
    // I will filter for status !== 'pending' to keep it clean, or include all. 
    // Standard banking apps show "Future" in statement too often. 
    // Let's stick to `filteredTransactions` but visually distinguish or filter 'pending' if strictly history.
    // Let's assume 'filteredTransactions' is the source of truth for "Dashboard Main View".
    // Actually, `filteredTransactions` includes everything that matches filters. 
    // Prompt 15 explicitly modified `filteredTransactions` to NOT include 'pending' in calculations, 
    // but `filteredTransactions` array itself in context MIGHT still include them depending on implementation?
    // Let's check Context implementation in Step 853.
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, endIndex);

    const getMemberAvatar = (memberId?: string) => {
        const member = members.find(m => m.id === memberId);
        return member?.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=random';
    };

    const getAccountName = (tx: Transaction) => {
        if (tx.accountId) {
            const acc = accounts.find(a => a.id === tx.accountId);
            return { name: acc?.bankName || 'Conta', icon: Wallet };
        }
        if (tx.cardId) {
            const card = creditCards.find(c => c.id === tx.cardId);
            return { name: card?.name || 'Cartão', icon: CreditCard };
        }
        // Fallback based on type logic or random for mock
        return { name: 'Carteira', icon: Wallet };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const paginationRange = () => {
        const range = [];
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range; // Simple range for now, can be optimized for large pages
    };

    return (
        <div className="bg-white rounded-card border border-brand-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-brand-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-text-primary">Extrato Detalhado</h2>
                <div className="text-xs text-brand-gray-500">
                    Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, transactions.length)} de {transactions.length}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-brand-gray-50 text-xs text-brand-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Membro</th>
                            <th className="px-6 py-4 font-medium">Data</th>
                            <th className="px-6 py-4 font-medium">Descrição</th>
                            <th className="px-6 py-4 font-medium">Categoria</th>
                            <th className="px-6 py-4 font-medium">Origem</th>
                            <th className="px-6 py-4 font-medium text-center">Parc.</th>
                            <th className="px-6 py-4 font-medium text-right">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {currentTransactions.length > 0 ? (
                            currentTransactions.map((tx, index) => {
                                const accountInfo = getAccountName(tx);
                                const isIncome = tx.type === 'income';
                                const CategoryBadgeColor = isIncome ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700';

                                return (
                                    <tr
                                        key={tx.id}
                                        className={`
                                            group transition-colors
                                            ${index % 2 === 0 ? 'bg-white' : 'bg-brand-gray-50/50'}
                                            hover:bg-brand-lime/5
                                        `}
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={getMemberAvatar(tx.memberId)}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full border border-brand-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-brand-gray-600">
                                            {formatDate(tx.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {isIncome ? (
                                                    <ArrowUpCircle size={16} className="text-green-500" />
                                                ) : (
                                                    <ArrowDownCircle size={16} className="text-red-500" />
                                                )}
                                                <span className="font-medium text-brand-black">{tx.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${CategoryBadgeColor}`}>
                                                {typeof tx.category === 'string' ? tx.category : tx.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-brand-gray-600">
                                            <div className="flex items-center gap-2">
                                                <accountInfo.icon size={14} />
                                                <span>{accountInfo.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-brand-gray-500">
                                            {tx.installments || '-'}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                                            {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-brand-gray-500">
                                    Nenhuma transação encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-brand-gray-100 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-brand-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div className="flex gap-1">
                        {paginationRange().map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`
                                    w-8 h-8 rounded-lg text-sm font-medium transition-colors
                                    ${currentPage === page
                                        ? 'bg-brand-black text-white'
                                        : 'bg-transparent text-brand-gray-600 hover:bg-brand-gray-100'
                                    }
                                `}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-brand-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
