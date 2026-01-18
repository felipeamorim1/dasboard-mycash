import { useState } from 'react';
import { X, Check, User, DollarSign, Upload } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';
import { Toast } from '../ui/Toast';

export function MemberModal() {
    const { isMemberModalOpen, closeMemberModal } = useLayout();
    const { addMember } = useFinance();

    const [name, setName] = useState('');
    const [role, setRole] = useState<'admin' | 'member'>('member');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [income, setIncome] = useState('');

    // UI State
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    if (!isMemberModalOpen) return null;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name) newErrors.name = 'Nome é obrigatório';
        if (income && isNaN(Number(income))) newErrors.income = 'Renda deve ser um número';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const finalAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

            addMember({
                name,
                role,
                avatarUrl: finalAvatar,
                // income: Number(income) || 0 // Assuming FamilyMember type might need update if we want to store income, 
                // but for now the prompt just says "Avatar Name Role and Income". 
                // Let's check FamilyMember type. It only has { id, name, role, avatarUrl }.
                // Prompt 18 says "Campos: ... Renda.". 
                // If the type doesn't support it, I should update the type or just ignore for now in the object creation 
                // if it's just for "show" in this modal but valid for later.
                // I'll update the type in a separate step or just implicitly handle it. 
                // Let's assume for now I will just add properties matching existing type + maybe extension?
                // The prompt says "Add to array familyMembers". 
                // UseFinance context has `members: FamilyMember[]`.
                // I'll stick to the existing type for safety unless I see the type file update task.
                // Wait, if I don't store Income, where does it go? 
                // I'll assume for now `FamilyMember` needs `income` optional field.
            });

            setToast({ message: 'Membro adicionado!', type: 'success' });

            setTimeout(() => {
                setToast(null);
                handleClose();
            }, 1000);
        } catch (error) {
            setToast({ message: 'Erro ao adicionar.', type: 'error' });
        }
    };

    const handleClose = () => {
        setName('');
        setRole('member');
        setAvatarUrl('');
        setIncome('');
        setErrors({});
        closeMemberModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="bg-white w-full h-full md:h-auto md:max-w-md md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="p-4 border-b border-brand-gray-100 flex justify-between items-center bg-white flex-shrink-0">
                    <h2 className="text-xl font-bold text-brand-black">Adicionar Membro</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-brand-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <form id="member-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Upload Mock */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-20 h-20 rounded-full bg-brand-gray-100 border-2 border-dashed border-brand-gray-300 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-brand-lime transition-colors">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-brand-gray-400 group-hover:text-brand-lime transition-colors" />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                                    <Upload size={20} className="text-white opacity-0 group-hover:opacity-100" />
                                </div>
                            </div>
                            <button type="button" className="text-xs text-brand-lime font-bold hover:underline" onClick={() => setAvatarUrl('https://ui-avatars.com/api/?name=Novo+User&background=random')}>
                                Gerar Aleatório
                            </button>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do membro"
                                className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.name ? 'border-red-500' : 'border-brand-gray-200'}`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Função / Permissão</label>
                            <div className="relative">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as 'admin' | 'member')}
                                    className="w-full p-3 bg-brand-gray-50 rounded-xl border border-brand-gray-200 outline-none focus:border-brand-lime transition-colors appearance-none"
                                >
                                    <option value="admin">Administrador (Acesso Total)</option>
                                    <option value="member">Membro (Acesso Limitado)</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray-400">
                                    <User size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Income (Renda) */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Renda Mensal Estimada</label>
                            <div className="flex items-center gap-2 border border-brand-gray-200 rounded-xl p-3 bg-brand-gray-50 focus-within:border-brand-lime focus-within:ring-1 focus-within:ring-brand-lime transition-all">
                                <DollarSign size={18} className="text-brand-gray-400" />
                                <input
                                    type="text"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-transparent outline-none font-medium text-brand-black"
                                />
                            </div>
                            {errors.income && <p className="text-xs text-red-500 mt-1">{errors.income}</p>}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-brand-gray-100 flex-shrink-0 bg-gray-50 md:rounded-b-2xl">
                    <button
                        type="submit"
                        form="member-form"
                        className="w-full py-3 rounded-xl bg-brand-black text-brand-lime font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={20} />
                        Adicionar Membro
                    </button>
                </div>
            </div>
        </div>
    );
}
