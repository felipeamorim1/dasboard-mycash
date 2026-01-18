import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';

export function MobileFilterModal() {
    const { isMobileFilterOpen, closeMobileFilter } = useLayout();
    const { members, filters, setFilters } = useFinance();

    // Temporary state - only applies when user clicks "Apply"
    // Note: Only filtering by member for now, type filter not in Filters interface
    const [tempMember, setTempMember] = useState<string>(filters.selectedMember);

    if (!isMobileFilterOpen) return null;

    const handleApply = () => {
        setFilters(prev => ({
            ...prev,
            selectedMember: tempMember
        }));
        closeMobileFilter();
    };

    const handleCancel = () => {
        // Reset to current filters
        setTempMember(filters.selectedMember);
        closeMobileFilter();
    };

    const handleClear = () => {
        setTempMember('all');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
                onClick={handleCancel}
            />

            {/* Slide-up Modal */}
            <div className={`
                fixed bottom-0 left-0 right-0 bg-white z-50 md:hidden
                rounded-t-3xl shadow-2xl
                transform transition-transform duration-300 ease-out
                ${isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'}
                max-h-[85vh] flex flex-col
            `}>
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-brand-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 py-4 border-b border-brand-gray-100 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-brand-black">Filtros</h2>
                    <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-brand-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Member Filter */}
                    <div>
                        <label className="block text-sm font-bold text-brand-gray-700 mb-3">Membro da Família</label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setTempMember('all')}
                                className={`
                                    px-6 py-3 rounded-full font-bold text-sm transition-all
                                    ${tempMember === 'all'
                                        ? 'bg-brand-black text-brand-lime shadow-md scale-105'
                                        : 'bg-brand-gray-100 text-brand-gray-600 hover:bg-brand-gray-200'}
                                `}
                            >
                                Todos
                            </button>
                            {members.map(member => (
                                <button
                                    key={member.id}
                                    onClick={() => setTempMember(member.id)}
                                    className={`
                                        px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2
                                        ${tempMember === member.id
                                            ? 'bg-brand-lime text-brand-black shadow-md scale-105 border-2 border-brand-black'
                                            : 'bg-brand-gray-100 text-brand-gray-600 hover:bg-brand-gray-200'}
                                    `}
                                >
                                    <img
                                        src={member.avatarUrl}
                                        alt={member.name}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    {member.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {tempMember !== 'all' && (
                        <button
                            onClick={handleClear}
                            className="w-full py-3 text-center text-sm font-bold text-brand-gray-500 hover:text-brand-black underline transition-colors"
                        >
                            Limpar Todos os Filtros
                        </button>
                    )}
                </div>

                {/* Footer - Actions */}
                <div className="p-6 border-t border-brand-gray-100 flex gap-3 flex-shrink-0 bg-brand-gray-50">
                    <button
                        onClick={handleCancel}
                        className="flex-1 py-4 rounded-xl bg-white border-2 border-brand-gray-300 text-brand-black font-bold text-lg hover:bg-brand-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 py-4 rounded-xl bg-brand-black text-brand-lime font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={20} />
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </>
    );
}
