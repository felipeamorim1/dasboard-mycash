import { Download, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { TransactionTable } from '../components/dashboard/TransactionTable';

export function TransactionsPage() {
    const { transactions, members } = useFinance();

    // Extract unique categories from transactions
    const categories = Array.from(new Set(
        transactions.map(tx => typeof tx.category === 'string' ? tx.category : tx.category.name)
    )).map((name: string) => ({ id: name, name }));

    // Local filter state (separate from global filters)
    const [localFilters, setLocalFilters] = useState({
        search: '',
        category: 'all',
        member: 'all',
        status: 'all',
        type: 'all'
    });

    // Apply local filters
    const filteredTransactions = transactions.filter(tx => {
        if (localFilters.search && !tx.description.toLowerCase().includes(localFilters.search.toLowerCase())) {
            return false;
        }
        if (localFilters.category !== 'all') {
            const txCategory = typeof tx.category === 'string' ? tx.category : tx.category.name;
            if (txCategory !== localFilters.category) return false;
        }
        if (localFilters.member !== 'all' && tx.memberId !== localFilters.member) {
            return false;
        }
        if (localFilters.status !== 'all' && tx.status !== localFilters.status) {
            return false;
        }
        if (localFilters.type !== 'all' && tx.type !== localFilters.type) {
            return false;
        }
        return true;
    });

    // Calculate summary stats
    const totalIncome = filteredTransactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = filteredTransactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const difference = totalIncome - totalExpense;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleExport = () => {
        // Simulation - show toast or alert
        alert('Exportação simulada! Em produção, geraria CSV/PDF com as transações filtradas.');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Transações</h1>
                    <p className="text-text-secondary text-sm">Extrato completo e detalhado</p>
                </div>
                <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-brand-black text-brand-lime rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Download size={20} />
                    Exportar
                </button>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={20} className="text-brand-gray-500" />
                    <h2 className="font-bold text-text-primary">Filtros Avançados</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative md:col-span-2 lg:col-span-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar descrição..."
                            value={localFilters.search}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-gray-200 bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                        />
                    </div>

                    {/* Type Filter */}
                    <div>
                        <select
                            value={localFilters.type}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-gray-200 bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                        >
                            <option value="all">Todos os Tipos</option>
                            <option value="income">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <select
                            value={localFilters.category}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-gray-200 bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                        >
                            <option value="all">Todas as Categorias</option>
                            {categories.map((cat: { id: string; name: string }) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Member Filter */}
                    <div>
                        <select
                            value={localFilters.member}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, member: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-gray-200 bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                        >
                            <option value="all">Todos os Membros</option>
                            {members.map(member => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={localFilters.status}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-gray-200 bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="completed">Concluído</option>
                            <option value="pending">Pendente</option>
                        </select>
                    </div>

                    {/* Clear Filters */}
                    {(localFilters.search || localFilters.type !== 'all' || localFilters.category !== 'all' ||
                        localFilters.member !== 'all' || localFilters.status !== 'all') && (
                            <div className="flex items-end">
                                <button
                                    onClick={() => setLocalFilters({
                                        search: '',
                                        category: 'all',
                                        member: 'all',
                                        status: 'all',
                                        type: 'all'
                                    })}
                                    className="px-4 py-2.5 text-sm font-bold text-brand-gray-500 hover:text-brand-black underline transition-colors"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        )}
                </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                    <p className="text-sm text-brand-gray-500 mb-1">Total de Receitas</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                    <p className="text-xs text-brand-gray-400 mt-1">
                        {filteredTransactions.filter(tx => tx.type === 'income').length} transações
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                    <p className="text-sm text-brand-gray-500 mb-1">Total de Despesas</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
                    <p className="text-xs text-brand-gray-400 mt-1">
                        {filteredTransactions.filter(tx => tx.type === 'expense').length} transações
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                    <p className="text-sm text-brand-gray-500 mb-1">Saldo Líquido</p>
                    <p className={`text-2xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(difference)}
                    </p>
                    <p className="text-xs text-brand-gray-400 mt-1">
                        {filteredTransactions.length} transações totais
                    </p>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white rounded-2xl border border-brand-gray-100 shadow-sm overflow-hidden">
                <TransactionTable overrideTransactions={filteredTransactions} />
            </div>
        </div>
    );
}
