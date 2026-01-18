import { Calendar, ChevronDown } from 'lucide-react';

export function DateRangeFilter() {
    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-gray-200 rounded-pill hover:border-brand-gray-300 transition-colors shadow-sm text-text-primary text-sm font-medium">
                <Calendar size={16} className="text-text-secondary" />
                <span>Este Mês</span>
                <ChevronDown size={14} className="text-text-secondary" />
            </button>

            {/* Dropdown Mockup (Functional logic would go here) */}
            <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-brand-gray-200 rounded-xl shadow-xl p-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-gray-50 text-brand-black font-medium bg-brand-gray-50">Este Mês</button>
                    <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-gray-50 text-text-secondary hover:text-text-primary">Mês Passado</button>
                    <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-gray-50 text-text-secondary hover:text-text-primary">Últimos 3 meses</button>
                    <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-gray-50 text-text-secondary hover:text-text-primary">Personalizado...</button>
                </div>
            </div>
        </div>
    );
}
