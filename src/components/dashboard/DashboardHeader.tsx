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
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Meu Painel</h1>
                    <p className="text-text-secondary text-sm md:text-base mt-1">Resumo financeiro da família</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Add Transaction Button */}
                    <button
                        className="touch-target px-6 py-3 bg-brand-black text-text-inverse rounded-pill font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg shadow-brand-black/20 text-sm md:text-base flex-1 md:flex-none"
                        aria-label="Adicionar nova transação"
                    >
                        <Plus className="inline mr-2" size={18} aria-hidden="true" />
                        Nova Transação
                    </button>
                </div>
            </div>

            {/* Bottom Row: Filters Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between bg-white p-2 rounded-2xl border border-brand-gray-100 shadow-sm">

                {/* Left: Global Search */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} aria-hidden="true" />
                    <label htmlFor="global-search" className="sr-only">Buscar transações</label>
                    <input
                        id="global-search"
                        type="search"
                        placeholder="Buscar por descrição, categoria..."
                        value={filters.searchText}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchText: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 min-h-[44px] rounded-xl border-none bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime text-text-primary transition-all placeholder:text-text-tertiary font-medium"
                        aria-label="Campo de busca global"
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
                                        relative touch-target rounded-full border-2 transition-transform hover:z-10 hover:scale-110
                                        ${filters.selectedMember === member.id ? 'border-brand-lime z-20 shadow-lg scale-110' : 'border-white'}
                                    `}
                                    aria-label={`Filtrar por ${member.name}`}
                                    aria-pressed={filters.selectedMember === member.id}
                                >
                                    <img src={member.avatarUrl} alt="" className="w-full h-full object-cover rounded-full" aria-hidden="true" />
                                    <span className="sr-only">{member.name}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => openMemberModal()}
                            className="touch-target rounded-full bg-white border border-dashed border-brand-gray-300 flex items-center justify-center text-text-secondary hover:text-brand-lime hover:border-brand-lime transition-colors"
                            aria-label="Adicionar novo membro da família"
                        >
                            <Plus size={20} aria-hidden="true" />
                        </button>

                        {filters.selectedMember !== 'all' && (
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, selectedMember: 'all' }))}
                                className="ml-2 text-sm font-bold text-text-secondary hover:text-text-primary underline touch-target"
                                aria-label="Limpar filtro de membro"
                            >
                                Limpar
                            </button>
                        )}
                    </div>

                    {/* Mobile Filter Trigger (Mock) */}
                    <button
                        onClick={() => openMobileFilter()}
                        className="md:hidden touch-target p-3 bg-brand-gray-100 rounded-full text-text-primary hover:bg-brand-lime hover:text-brand-black transition-colors"
                        aria-label="Abrir filtros"
                    >
                        <Filter size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
