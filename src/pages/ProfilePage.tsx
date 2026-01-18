import { useState } from 'react';
import { User, Edit, LogOut, DollarSign } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useLayout } from '../context/LayoutContext';

export function ProfilePage() {
    const { members } = useFinance();
    const { openMemberModal } = useLayout();
    const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info');

    // Mock current user (in production, would come from auth context)
    const currentUser = members[0] || {
        id: '1',
        name: 'Usuário Principal',
        role: 'admin' as const,
        avatarUrl: 'https://ui-avatars.com/api/?name=User&background=CCFF00&color=000',
        income: 5000
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleLogout = () => {
        alert('Logout simulado! Em produção, deslogaria o usuário e redirecionaria para login.');
    };

    return (
        <div className="space-y-6">
            {/* Header with Tabs */}
            <div>
                <h1 className="text-2xl font-bold text-text-primary mb-6">Perfil</h1>

                {/* Tab Navigation */}
                <div className="flex gap-2 border-b border-brand-gray-200">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`
                            px-6 py-3 font-bold text-sm transition-all relative
                            ${activeTab === 'info'
                                ? 'text-brand-black'
                                : 'text-brand-gray-500 hover:text-brand-black'}
                        `}
                    >
                        Informações
                        {activeTab === 'info' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`
                            px-6 py-3 font-bold text-sm transition-all relative
                            ${activeTab === 'settings'
                                ? 'text-brand-black'
                                : 'text-brand-gray-500 hover:text-brand-black'}
                        `}
                    >
                        Configurações
                        {activeTab === 'settings' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
                        )}
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'info' && (
                <div className="space-y-6">
                    {/* User Card */}
                    <div className="bg-white p-8 rounded-2xl border border-brand-gray-100 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <img
                                    src={currentUser.avatarUrl}
                                    alt={currentUser.name}
                                    className="w-32 h-32 rounded-full border-4 border-brand-lime shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-brand-black text-brand-lime rounded-full p-2 shadow-md">
                                    <User size={20} />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-brand-black mb-2">{currentUser.name}</h2>
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <span className={`
                                        inline-block px-4 py-1.5 rounded-full text-sm font-bold
                                        ${currentUser.role === 'admin'
                                            ? 'bg-brand-lime text-brand-black'
                                            : 'bg-brand-gray-100 text-brand-gray-700'}
                                    `}>
                                        {currentUser.role === 'admin' ? 'Administrador' : 'Membro'}
                                    </span>
                                    {currentUser.income && (
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-bold">
                                            <DollarSign size={16} />
                                            {formatCurrency(currentUser.income)} / mês
                                        </div>
                                    )}
                                </div>
                                <p className="text-brand-gray-500">
                                    Gerenciando as finanças da família desde sempre
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Family Members List */}
                    <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-brand-black">Membros da Família</h3>
                            <button
                                onClick={() => openMemberModal()}
                                className="px-4 py-2 bg-brand-black text-brand-lime rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all text-sm"
                            >
                                + Adicionar Membro
                            </button>
                        </div>

                        <div className="space-y-3">
                            {members.map(member => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-4 rounded-xl border border-brand-gray-200 hover:border-brand-lime transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={member.avatarUrl}
                                            alt={member.name}
                                            className="w-14 h-14 rounded-full border-2 border-brand-gray-200 group-hover:border-brand-lime transition-colors"
                                        />
                                        <div>
                                            <p className="font-bold text-brand-black">{member.name}</p>
                                            <div className="flex gap-2 items-center mt-1">
                                                <span className={`
                                                    text-xs px-2 py-0.5 rounded-full font-medium
                                                    ${member.role === 'admin'
                                                        ? 'bg-brand-lime text-brand-black'
                                                        : 'bg-brand-gray-100 text-brand-gray-600'}
                                                `}>
                                                    {member.role === 'admin' ? 'Admin' : 'Membro'}
                                                </span>
                                                {member.income && (
                                                    <span className="text-xs text-green-600 font-medium">
                                                        {formatCurrency(member.income)}/mês
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openMemberModal()}
                                        className="p-2 rounded-lg hover:bg-brand-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Editar membro"
                                    >
                                        <Edit size={18} className="text-brand-gray-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                        <h3 className="text-lg font-bold text-brand-black mb-3">Ações da Conta</h3>
                        <button
                            onClick={handleLogout}
                            className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <LogOut size={20} />
                            Sair da Conta
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="space-y-6">
                    {/* Preferences Section */}
                    <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-brand-black mb-4">Preferências</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-brand-gray-200">
                                <div>
                                    <p className="font-bold text-brand-black">Notificações</p>
                                    <p className="text-sm text-brand-gray-500">Receber alertas sobre transações importantes</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-lime rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-lime"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-brand-gray-200">
                                <div>
                                    <p className="font-bold text-brand-black">Lembretes de Vencimento</p>
                                    <p className="text-sm text-brand-gray-500">Alertas 3 dias antes do vencimento de faturas</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-brand-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-lime rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-lime"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Category Management Section */}
                    <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-brand-black mb-4">Gestão de Categorias</h3>

                        {/* Income Categories */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-brand-black">Categorias de Receita</h4>
                                <button className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                                    + Nova Categoria
                                </button>
                            </div>
                            <div className="space-y-2">
                                {['Salário', 'Freelance', 'Investimentos', 'Outros'].map(cat => (
                                    <div key={cat} className="flex items-center justify-between p-3 rounded-lg border border-brand-gray-200 hover:border-green-300 transition-colors group">
                                        <span className="font-medium text-brand-black">{cat}</span>
                                        <button className="text-brand-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expense Categories */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-brand-black">Categorias de Despesa</h4>
                                <button className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                    + Nova Categoria
                                </button>
                            </div>
                            <div className="space-y-2">
                                {['Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Moradia'].map(cat => (
                                    <div key={cat} className="flex items-center justify-between p-3 rounded-lg border border-brand-gray-200 hover:border-red-300 transition-colors group">
                                        <span className="font-medium text-brand-black">{cat}</span>
                                        <button className="text-brand-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Privacy Section */}
                    <div className="bg-white p-6 rounded-2xl border border-brand-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-brand-black mb-4">Privacidade e Dados</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    if (window.confirm('Exportar todos os seus dados em formato JSON?')) {
                                        alert('Exportação simulada! Em produção, geraria arquivo JSON para download.');
                                    }
                                }}
                                className="w-full p-4 rounded-xl border-2 border-brand-gray-200 hover:border-brand-lime transition-all flex items-center justify-between group"
                            >
                                <div className="text-left">
                                    <p className="font-bold text-brand-black">Exportar Meus Dados</p>
                                    <p className="text-sm text-brand-gray-500">Baixe uma cópia de todas as suas informações</p>
                                </div>
                                <span className="text-brand-gray-400 group-hover:text-brand-lime transition-colors">→</span>
                            </button>

                            <button
                                onClick={() => {
                                    if (window.confirm('⚠️ ATENÇÃO: Esta ação é irreversível!\n\nTodos os seus dados serão permanentemente removidos. Deseja continuar?')) {
                                        if (window.confirm('Confirme novamente: Tem certeza que deseja limpar TODOS os dados da conta?')) {
                                            alert('Limpeza simulada! Em produção, removeria todos os dados do usuário.');
                                        }
                                    }
                                }}
                                className="w-full p-4 rounded-xl border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all flex items-center justify-between group"
                            >
                                <div className="text-left">
                                    <p className="font-bold text-red-600">Limpar Todos os Dados</p>
                                    <p className="text-sm text-red-500">Remover permanentemente todas as informações</p>
                                </div>
                                <span className="text-red-400 group-hover:text-red-600 transition-colors">⚠️</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
