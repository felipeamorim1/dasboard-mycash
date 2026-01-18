import { Search, Filter, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext'; // Import useLayout
import { DateRangeFilter } from './filters/DateRangeFilter';

export function DashboardHeader() {
    const { members, filters, setFilters } = useFinance();
    const { openMemberModal, openMobileFilter } = useLayout(); // Destructure correct function

    return (
        <div className="flex flex-col gap-6">
            {/* Top Row: Title & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Meu Painel</h1>
                    <p className="text-text-secondary text-sm">Resumo financeiro da família</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Add Transaction Button */}
                    <button className="px-6 py-2.5 bg-brand-black text-text-inverse rounded-pill font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg shadow-brand-black/20 text-sm md:text-base flex-1 md:flex-none">
                        + Nova Transação
                    </button>
                </div>
            </div>

            {/* Bottom Row: Filters Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between bg-white p-2 rounded-2xl border border-brand-gray-100 shadow-sm">

                {/* Left: Global Search */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por descrição, categoria..."
                        value={filters.searchText}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchText: e.target.value }))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border-none bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime text-text-primary transition-all placeholder:text-brand-gray-400 font-medium"
                    />
                </div>

                {/* Right: Specific Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="hidden md:block w-px h-8 bg-brand-gray-200 mx-2" />

                    <DateRangeFilter />

                    <div className="hidden md:block w-px h-8 bg-brand-gray-200 mx-2" />

                    {/* Member Filter + Add Button */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 overflow-hidden items-center">
                            {members.map((member) => (
                                <button
                                    key={member.id}
                                    onClick={() => setFilters(prev => ({ ...prev, selectedMember: member.id === filters.selectedMember ? 'all' : member.id }))}
                                    className={`
                                        relative w-10 h-10 rounded-full border-2 transition-transform hover:z-10 hover:scale-110 focus:outline-none
                                        ${filters.selectedMember === member.id ? 'border-brand-lime z-20 shadow-lg scale-110' : 'border-white'}
                                    `}
                                    title={member.name}
                                >
                                    <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => openMemberModal()}
                            className="w-8 h-8 rounded-full bg-white border border-dashed border-brand-gray-300 flex items-center justify-center text-brand-gray-400 hover:text-brand-lime hover:border-brand-lime transition-colors"
                            title="Adicionar Membro"
                        >
                            <Plus size={16} />
                        </button>

                        {filters.selectedMember !== 'all' && (
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, selectedMember: 'all' }))}
                                className="ml-2 text-xs font-bold text-brand-gray-500 hover:text-brand-black underline"
                            >
                                Limpar
                            </button>
                        )}
                    </div>

                    {/* Mobile Filter Trigger (Mock) */}
                    <button
                        onClick={() => openMobileFilter()}
                        className="md:hidden p-2.5 bg-brand-gray-100 rounded-full text-text-primary hover:bg-brand-lime hover:text-brand-black transition-colors"
                    >
                        <Filter size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
