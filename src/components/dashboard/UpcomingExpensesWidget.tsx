import { useState } from 'react';
import { Calendar, Check, Wallet } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import type { Transaction } from '../../types';

interface ExpenseItemProps {
    transaction: Transaction;
    onPay: (id: string) => void;
}

function ExpenseItem({ transaction, onPay }: ExpenseItemProps) {
    const [isLeaving, setIsLeaving] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(true);
        setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => {
                onPay(transaction.id);
            }, 300); // Wait for fade out
        }, 500); // Wait for check animation
    };

    const formattedDate = new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
    });

    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(transaction.amount);

    return (
        <div
            className={`
                flex items-center justify-between p-3 bg-white rounded-lg border border-brand-gray-200 shadow-sm
                transition-all duration-300
                ${isLeaving ? 'opacity-0 -translate-x-4 h-0 mb-0 py-0 overflow-hidden' : 'opacity-100 mb-3'}
            `}
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={handleCheck}
                    className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${isChecked
                            ? 'bg-brand-lime border-brand-lime text-brand-black'
                            : 'border-brand-gray-300 text-transparent hover:border-brand-lime'
                        }
                    `}
                >
                    <Check size={14} strokeWidth={3} />
                </button>

                <div>
                    <h4 className="font-semibold text-sm text-brand-black">{transaction.description}</h4>
                    <div className="flex items-center gap-2 text-xs text-brand-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar size={10} /> {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            {/* Assuming if recurring maybe card or wallet depending on logic, keeping simple for now */}
                            <Wallet size={10} /> Conta
                        </span>
                    </div>
                </div>
            </div>

            <span className="font-bold text-sm text-brand-black">{formattedAmount}</span>
        </div>
    );
}

export function UpcomingExpensesWidget() {
    const { upcomingExpenses, markAsPaid } = useFinance();

    return (
        <div className="bg-brand-gray-50 p-6 rounded-card h-full flex flex-col">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                Próximas Despesas
                <span className="px-2 py-0.5 rounded-full bg-brand-gray-200 text-xs text-brand-gray-600">
                    {upcomingExpenses.length}
                </span>
            </h2>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1">
                {upcomingExpenses.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-60">
                        <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mb-3 text-brand-lime-dark">
                            <Check size={32} />
                        </div>
                        <p className="font-bold text-brand-gray-800">Tudo em dia!</p>
                        <p className="text-xs text-brand-gray-500">Nenhuma despesa pendente.</p>
                    </div>
                ) : (
                    <div>
                        {upcomingExpenses.map(expense => (
                            <ExpenseItem
                                key={expense.id}
                                transaction={expense}
                                onPay={markAsPaid}
                            />
                        ))}
                    </div>
                )}
            </div>

            <button className="mt-4 w-full py-2.5 text-sm font-bold text-brand-gray-600 bg-white border border-brand-gray-200 rounded-lg hover:border-brand-gray-300 transition-colors">
                Ver Agenda Completa
            </button>
        </div>
    );
}
