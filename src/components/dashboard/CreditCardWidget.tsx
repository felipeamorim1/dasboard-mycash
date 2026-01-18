import { CreditCard as CardIcon } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';
import type { CreditCard } from '../../types';

interface CardItemProps {
    card: CreditCard;
    onClick: () => void;
}

function CardItem({ card, onClick }: CardItemProps) {
    const usagePercentage = Math.round((card.currentBill / card.limit) * 100);

    // Theme Logic based on card color mock (Simplified for prompt requirements)
    // In a real app, this would be more robust. 
    // We map specifics or default to white.
    let themeClass = 'bg-white text-brand-black border-brand-gray-200';
    let badgeClass = 'bg-brand-gray-100 text-brand-black';
    let iconClass = 'text-brand-black';

    if (card.color === '#000000') {
        themeClass = 'bg-brand-black text-white border-brand-black';
        badgeClass = 'bg-brand-gray-800 text-white';
        iconClass = 'text-brand-lime';
    } else if (card.color === '#CCFF00' || card.color === '#ccff00') { // Lime
        themeClass = 'bg-brand-lime text-brand-black border-brand-lime';
        badgeClass = 'bg-black/10 text-brand-black';
        iconClass = 'text-brand-black';
    }

    const formattedBill = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(card.currentBill);

    return (
        <div
            onClick={onClick}
            className={`
            p-4 rounded-xl border shadow-sm transition-all duration-300 transform 
            hover:-translate-y-1 hover:shadow-lg cursor-pointer group
            ${themeClass}
        `}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${card.color === '#000000' ? 'bg-white/10' : 'bg-black/5'}`}>
                        <CardIcon size={20} className={iconClass} />
                    </div>
                    <div>
                        <p className="font-bold text-sm">{card.name}</p>
                        <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-500'}`}>
                            **** {card.last4Digits}
                        </p>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-bold ${badgeClass}`}>
                    {usagePercentage}%
                </div>
            </div>

            <div>
                <p className={`text-xs ${card.color === '#000000' ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Fatura Atual</p>
                <p className="text-xl font-bold tracking-tight">{formattedBill}</p>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${card.color === '#000000' ? 'bg-brand-lime' : 'bg-brand-black'}`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
            </div>
        </div>
    );
}

export function CreditCardWidget() {
    const { creditCards } = useFinance();
    const { openAccountModal, openCardDetailsModal } = useLayout();

    return (
        <div className="bg-brand-gray-50 p-6 rounded-card h-full flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-text-primary mb-4 flex items-center justify-between">
                Meus Cartões
                <button
                    className="text-sm font-bold text-text-lime-accessible hover:text-text-primary hover:underline touch-target"
                    aria-label="Ver todos os cartões"
                >
                    Ver todos
                </button>
            </h2>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {creditCards.map(card => (
                    <CardItem key={card.id} card={card} onClick={() => openCardDetailsModal(card.id)} />
                ))}

                <button
                    onClick={() => openAccountModal()}
                    className="p-4 rounded-xl border-2 border-dashed border-brand-gray-300 flex items-center justify-center gap-2 text-brand-gray-500 hover:border-brand-lime hover:text-brand-black transition-colors min-h-[120px]"
                >
                    <span className="font-bold">+ Adicionar Cartão</span>
                </button>
            </div>
        </div>
    );
}
