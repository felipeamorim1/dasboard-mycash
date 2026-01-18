import { X, Plus, TrendingDown, Calendar, CreditCard as CardIcon } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';

export function CardDetailsModal() {
    const { selectedCardId, closeCardDetailsModal, openTransactionModal } = useLayout();
    const { creditCards, transactions } = useFinance();

    if (!selectedCardId) return null;

    const card = creditCards.find(c => c.id === selectedCardId);
    if (!card) return null;

    // Filter transactions for this card
    const cardTransactions = transactions.filter(t => t.cardId === card.id && t.type === 'expense');

    // Calculate metrics
    const usagePercentage = Math.round((card.currentBill / card.limit) * 100);
    const available = card.limit - card.currentBill;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short'
        });
    };

    // Theme Logic
    let themeClass = 'bg-white text-brand-black';
    let badgeClass = 'bg-brand-gray-100 text-brand-black';
    let progressBarClass = 'bg-brand-black';

    if (card.color === '#000000') {
        themeClass = 'bg-brand-black text-white';
        badgeClass = 'bg-brand-gray-800 text-white';
        progressBarClass = 'bg-brand-lime';
    } else if (card.color === '#CCFF00' || card.color === '#ccff00') {
        themeClass = 'bg-brand-lime text-brand-black';
        badgeClass = 'bg-black/10 text-brand-black';
        progressBarClass = 'bg-brand-black';
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
                {/* Header - Card Preview */}
                <div className={`p-6 ${themeClass} flex-shrink-0`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${card.color === '#000000' ? 'bg-white/10' : 'bg-black/5'}`}>
                                <CardIcon size={24} className={card.color === '#000000' ? 'text-brand-lime' : 'text-brand-black'} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{card.name}</h2>
                                <p className={`text-sm ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    **** {card.last4Digits}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={closeCardDetailsModal}
                            className={`p-2 rounded-full transition-colors ${card.color === '#000000' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Limite Total</p>
                            <p className="text-lg font-bold">{formatCurrency(card.limit)}</p>
                        </div>
                        <div>
                            <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Fatura Atual</p>
                            <p className="text-lg font-bold">{formatCurrency(card.currentBill)}</p>
                        </div>
                        <div>
                            <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Disponível</p>
                            <p className="text-lg font-bold text-green-500">{formatCurrency(available)}</p>
                        </div>
                        <div>
                            <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Uso</p>
                            <div className={`inline-block px-2 py-1 rounded-md text-sm font-bold ${badgeClass}`}>
                                {usagePercentage}%
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex gap-4 text-xs mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Fecha dia {card.closingDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Vence dia {card.dueDate}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${progressBarClass} transition-all`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Body - Transactions */}
                <div className="flex-1 overflow-y-auto p-6 bg-brand-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-text-primary">Gastos deste Cartão</h3>
                        <span className="text-sm text-text-secondary">{cardTransactions.length} transações</span>
                    </div>

                    {cardTransactions.length === 0 ? (
                        <div className="text-center py-12 text-text-secondary">
                            <TrendingDown size={48} className="mx-auto mb-2 opacity-50" />
                            <p>Nenhuma transação registrada</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {cardTransactions.map((tx) => (
                                <div key={tx.id} className="bg-white p-4 rounded-xl border border-brand-gray-200 hover:shadow-sm transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-bold text-brand-black">{tx.description}</p>
                                            <div className="flex gap-2 items-center mt-1">
                                                <span className="text-xs text-text-secondary">{formatDate(tx.date)}</span>
                                                {tx.installments && (
                                                    <span className="text-xs bg-brand-gray-100 px-2 py-0.5 rounded-full text-brand-black font-medium">
                                                        {tx.installments}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="font-bold text-red-600">
                                            {formatCurrency(tx.amount)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Actions */}
                <div className="p-4 border-t border-brand-gray-100 flex gap-2 flex-shrink-0 bg-white md:rounded-b-2xl">
                    <button className="flex-1 py-3 rounded-xl bg-brand-gray-100 text-brand-black font-bold hover:bg-brand-gray-200 transition-colors">
                        Ver Extrato Completo
                    </button>
                    <button
                        onClick={() => {
                            closeCardDetailsModal();
                            openTransactionModal();
                            // TODO: Pre-fill with card info
                        }}
                        className="flex-1 py-3 rounded-xl bg-brand-black text-brand-lime font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        Adicionar Despesa
                    </button>
                </div>
            </div>
        </div>
    );
}
