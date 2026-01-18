import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

interface KPICardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    variant?: 'primary' | 'default'; // primary = Balance (Black), default = White
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function KPICard({ title, value, icon: Icon, variant = 'default', trend }: KPICardProps) {
    const animatedValue = useCountUp(value, 800);

    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(animatedValue);

    const isPrimary = variant === 'primary';

    return (
        <div
            className={`
                p-6 rounded-card border shadow-sm flex flex-col justify-between h-32 md:h-40 relative overflow-hidden group transition-all duration-300
                ${isPrimary
                    ? 'bg-brand-black border-brand-black text-text-inverse hover:shadow-brand-lime/20 hover:shadow-lg'
                    : 'bg-ui-card border-ui-border text-text-primary hover:border-brand-gray-300 hover:shadow-md'}
            `}
        >
            {/* Header */}
            <div className="flex justify-between items-start z-10">
                <span className={`font-medium text-sm ${isPrimary ? 'text-brand-gray-400' : 'text-text-secondary'}`}>
                    {title}
                </span>
                <div
                    className={`
                        p-2 rounded-full transition-transform duration-300 group-hover:scale-110
                        ${isPrimary ? 'bg-brand-lime text-brand-black' : 'bg-brand-gray-100 text-brand-black'}
                    `}
                >
                    <Icon size={20} strokeWidth={2.5} />
                </div>
            </div>

            {/* Value & Trend */}
            <div className="z-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                    {formattedValue}
                </h3>

                {trend && (
                    <div className="flex items-center gap-1.5">
                        <span
                            className={`
                                text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center
                                ${trend.isPositive
                                    ? (isPrimary ? 'bg-brand-lime text-brand-black' : 'bg-emerald-100 text-emerald-700')
                                    : (isPrimary ? 'bg-brand-gray-700 text-white' : 'bg-red-100 text-red-700')}
                            `}
                        >
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                        <span className={`text-xs ${isPrimary ? 'text-brand-gray-500' : 'text-text-secondary'}`}>
                            vs. mês anterior
                        </span>
                    </div>
                )}
            </div>

            {/* Decorative Background Blur */}
            {isPrimary && (
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-lime rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            )}

            {!isPrimary && (
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gray-100 rounded-full opacity-50 blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
            )}
        </div>
    );
}
