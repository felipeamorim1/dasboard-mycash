import type { Transaction } from '../../types';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionListProps {
    transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
    return (
        <div className="bg-white rounded-xl border border-brand-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-brand-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-brand-gray-900">Transações Recentes</h3>
                <button className="text-sm text-brand-lime hover:underline font-medium text-gray-900">Ver todas</button>
            </div>

            <div className="overflow-y-auto flex-1 p-0">
                {transactions.length === 0 ? (
                    <div className="p-8 text-center text-brand-gray-400">Nenhuma transação encontrada.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-brand-gray-50 text-xs text-brand-gray-500 uppercase sticky top-0">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Descrição</th>
                                <th className="px-4 py-3 font-semibold text-right">Valor</th>
                                <th className="px-4 py-3 font-semibold hidden md:table-cell">Data</th>
                                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Categoria</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-gray-100">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-brand-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {tx.type === 'income' ? (
                                                <ArrowUpCircle size={18} className="text-green-500 shrink-0" />
                                            ) : (
                                                <ArrowDownCircle size={18} className="text-red-500 shrink-0" />
                                            )}
                                            <span className="font-medium text-brand-gray-800 truncate max-w-[120px] sm:max-w-none">
                                                {tx.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={`px-4 py-3 text-right font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.type === 'expense' ? '-' : '+'}
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-brand-gray-500 hidden md:table-cell">
                                        {new Date(tx.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-brand-gray-500 hidden sm:table-cell">
                                        <span className="inline-block px-2 py-1 rounded-full bg-brand-gray-200 text-xs font-medium">
                                            {typeof tx.category === 'string' ? tx.category : tx.category.name}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
