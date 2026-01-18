import { CreditCard as CardIcon, Plus, Calendar } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useLayout } from '../context/LayoutContext';

export function CardsPage() {
    const { creditCards } = useFinance();
    const { openAccountModal, openCardDetailsModal } = useLayout();

    // Empty State
    if (creditCards.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center max-w-md p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-brand-gray-100 rounded-full flex items-center justify-center">
                        <CardIcon size={40} className="text-brand-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Nenhum Cartão Cadastrado</h2>
                    <p className="text-text-secondary mb-6">
                        Adicione seu primeiro cartão de crédito para começar a gerenciar suas faturas.
                    </p>
                    <button
                        onClick={() => openAccountModal()}
                        className="px-8 py-4 bg-brand-black text-brand-lime rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                    >
                        <Plus size={20} />
                        Adicionar Primeiro Cartão
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Meus Cartões</h1>
                    <p className="text-text-secondary text-sm">Gerencie todos os seus cartões de crédito</p>
                </div>
                <button
                    onClick={() => openAccountModal()}
                    className="px-6 py-3 bg-brand-black text-brand-lime rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Plus size={20} />
                    Novo Cartão
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creditCards.map(card => (
                    <CardDetail key={card.id} card={card} onClick={() => openCardDetailsModal(card.id)} />
                ))}
            </div>
        </div>
    );
}

interface CardDetailProps {
    card: any;
    onClick: () => void;
}

function CardDetail({ card, onClick }: CardDetailProps) {
    const usagePercentage = Math.round((card.currentBill / card.limit) * 100);
    const available = card.limit - card.currentBill;

    // Theme Logic
    let themeClass = 'bg-white text-brand-black border-brand-gray-200';
    let badgeClass = 'bg-brand-gray-100 text-brand-black';
    let progressBarClass = 'bg-brand-black';
    let iconBg = 'bg-black/5';

    if (card.color === '#000000') {
        themeClass = 'bg-brand-black text-white border-brand-black';
        badgeClass = 'bg-brand-gray-800 text-white';
        progressBarClass = 'bg-brand-lime';
        iconBg = 'bg-white/10';
    } else if (card.color === '#CCFF00' || card.color === '#ccff00') {
        themeClass = 'bg-brand-lime text-brand-black border-brand-lime';
        badgeClass = 'bg-black/10 text-brand-black';
        progressBarClass = 'bg-brand-black';
        iconBg = 'bg-black/5';
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div
            onClick={onClick}
            className={`
                p-6 rounded-2xl border-2 shadow-md transition-all duration-300 transform
                hover:-translate-y-2 hover:shadow-2xl cursor-pointer
                ${themeClass}
            `}
        >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${iconBg}`}>
                        <CardIcon size={24} className={card.color === '#000000' ? 'text-brand-lime' : 'text-brand-black'} />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{card.name}</p>
                        <p className={`text-sm ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'}`}>
                            **** {card.last4Digits}
                        </p>
                    </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${badgeClass}`}>
                    {usagePercentage}%
                </div>
            </div>

            {/* Amounts */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Fatura Atual</p>
                    <p className="text-xl font-bold">{formatCurrency(card.currentBill)}</p>
                </div>
                <div>
                    <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Disponível</p>
                    <p className="text-xl font-bold text-green-500">{formatCurrency(available)}</p>
                </div>
            </div>

            {/* Limit */}
            <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                    <span className={card.color === '#000000' ? 'text-gray-400' : 'text-gray-600'}>Limite Total</span>
                    <span className="font-bold">{formatCurrency(card.limit)}</span>
                </div>
                {/* Progress Bar */}
                <div className="h-2.5 w-full bg-black/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${progressBarClass} transition-all`}
                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                </div>
            </div>

            {/* Dates */}
            <div className={`flex gap-4 text-xs pt-4 border-t ${card.color === '#000000' ? 'border-white/10' : 'border-black/10'}`}>
                <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>Fecha dia {card.closingDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span className="font-bold">Vence dia {card.dueDate}</span>
                </div>
            </div>
        </div>
    );
}
