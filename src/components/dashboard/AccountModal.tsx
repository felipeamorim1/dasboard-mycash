import { useState } from 'react';
import { X, Check, Wallet, CreditCard, Palette, User, Building2 } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';
import { Toast } from '../ui/Toast';

export function AccountModal() {
    const { isAccountModalOpen, closeAccountModal } = useLayout();
    const { addAccount, members } = useFinance();

    // Type Toggle
    const [type, setType] = useState<'account' | 'card'>('account');

    // Common Fields
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');
    const [ownerId, setOwnerId] = useState(''); // Only storing ID for simplicity

    // Account Fields
    const [balance, setBalance] = useState('');
    const [bankName, setBankName] = useState('');

    // Card Fields
    const [limit, setLimit] = useState('');
    const [closingDay, setClosingDay] = useState('');
    const [dueDay, setDueDay] = useState('');


    // UI State
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    if (!isAccountModalOpen) return null;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name) newErrors.name = 'Nome é obrigatório';
        if (!ownerId) newErrors.ownerId = 'Titular é obrigatório';

        if (type === 'account') {
            if (!balance) newErrors.balance = 'Saldo é obrigatório';
            if (isNaN(Number(balance))) newErrors.balance = 'Saldo inválido';
            if (!bankName) newErrors.bankName = 'Banco é obrigatório';
        } else {
            if (!limit) newErrors.limit = 'Limite é obrigatório';
            if (isNaN(Number(limit))) newErrors.limit = 'Limite inválido';
            if (!closingDay || Number(closingDay) < 1 || Number(closingDay) > 31) newErrors.closingDay = 'Dia inválido';
            if (!dueDay || Number(dueDay) < 1 || Number(dueDay) > 31) newErrors.dueDay = 'Dia inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (type === 'account') {
                addAccount({
                    name,
                    type: 'CHECKING',
                    bank: bankName,
                    lastDigits: null,
                    holderId: ownerId,
                    balance: Number(balance),
                    creditLimit: null,
                    currentBill: 0,
                    closingDay: null,
                    dueDay: null,
                    color,
                    theme: null,
                    logoUrl: null,
                    isActive: true
                });
            } else {
                addAccount({
                    name,
                    type: 'CREDIT_CARD',
                    bank: 'Emissor',
                    lastDigits: Math.floor(1000 + Math.random() * 9000).toString(),
                    holderId: ownerId,
                    balance: 0,
                    creditLimit: Number(limit),
                    currentBill: 0,
                    closingDay: Number(closingDay),
                    dueDay: Number(dueDay),
                    color,
                    theme: null,
                    logoUrl: null,
                    isActive: true
                });
            }

            setToast({ message: type === 'account' ? 'Conta criada!' : 'Cartão criado!', type: 'success' });

            setTimeout(() => {
                setToast(null);
                handleClose();
            }, 1000);
        } catch (error) {
            setToast({ message: 'Erro ao criar.', type: 'error' });
        }
    };

    const handleClose = () => {
        setName('');
        setColor('#000000');
        setOwnerId('');
        setBalance('');
        setBankName('');
        setLimit('');
        setClosingDay('');
        setDueDay('');
        setErrors({});
        closeAccountModal();
    };

    const COLORS = [
        { hex: '#000000', name: 'Black' },
        { hex: '#CCFF00', name: 'Lime' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#8B5CF6', name: 'Purple' },
        { hex: '#EF4444', name: 'Red' },
        { hex: '#3B82F6', name: 'Blue' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="bg-white w-full h-full md:h-auto md:max-w-md md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="p-4 border-b border-brand-gray-100 flex justify-between items-center bg-white flex-shrink-0">
                    <h2 className="text-xl font-bold text-brand-black">Adicionar Ativo</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-brand-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Type Toggle */}
                <div className="p-4 flex gap-2 border-b border-brand-gray-50">
                    <button
                        type="button"
                        onClick={() => setType('account')}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2
                            ${type === 'account' ? 'bg-brand-black text-brand-lime shadow-md' : 'bg-brand-gray-50 text-brand-gray-500 hover:bg-brand-gray-100'}
                        `}
                    >
                        <Wallet size={16} />
                        Conta Bancária
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('card')}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2
                            ${type === 'card' ? 'bg-brand-black text-brand-lime shadow-md' : 'bg-brand-gray-50 text-brand-gray-500 hover:bg-brand-gray-100'}
                        `}
                    >
                        <CreditCard size={16} />
                        Cartão de Crédito
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <form id="account-form" onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Nome do Ativo</label>
                            <div className="relative">
                                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={type === 'account' ? "Ex: Nubank Principal" : "Ex: Platinum Black"}
                                    className={`w-full pl-10 p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.name ? 'border-red-500' : 'border-brand-gray-200'}`}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Bank (Only Account) */}
                        {type === 'account' && (
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Instituição</label>
                                <input
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    placeholder="Ex: Itaú, Nubank..."
                                    className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.bankName ? 'border-red-500' : 'border-brand-gray-200'}`}
                                />
                                {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
                            </div>
                        )}

                        {/* Owner */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Titular</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
                                <select
                                    value={ownerId}
                                    onChange={(e) => setOwnerId(e.target.value)}
                                    className={`w-full pl-10 p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors appearance-none ${errors.ownerId ? 'border-red-500' : 'border-brand-gray-200'}`}
                                >
                                    <option value="">Selecione um membro</option>
                                    {members.map(member => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.ownerId && <p className="text-xs text-red-500 mt-1">{errors.ownerId}</p>}
                        </div>

                        {/* Specifics */}
                        <div className="grid grid-cols-2 gap-4">
                            {type === 'account' ? (
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Saldo Atual</label>
                                    <input
                                        type="number"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        placeholder="0.00"
                                        className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.balance ? 'border-red-500' : 'border-brand-gray-200'}`}
                                    />
                                    {errors.balance && <p className="text-xs text-red-500 mt-1">{errors.balance}</p>}
                                </div>
                            ) : (
                                <>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Limite Total</label>
                                        <input
                                            type="number"
                                            value={limit}
                                            onChange={(e) => setLimit(e.target.value)}
                                            placeholder="5000.00"
                                            className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.limit ? 'border-red-500' : 'border-brand-gray-200'}`}
                                        />
                                        {errors.limit && <p className="text-xs text-red-500 mt-1">{errors.limit}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Dia Fechamento</label>
                                        <input
                                            type="number"
                                            value={closingDay}
                                            onChange={(e) => setClosingDay(e.target.value)}
                                            placeholder="Dia 05"
                                            className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.closingDay ? 'border-red-500' : 'border-brand-gray-200'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Dia Vencimento</label>
                                        <input
                                            type="number"
                                            value={dueDay}
                                            onChange={(e) => setDueDay(e.target.value)}
                                            placeholder="Dia 10"
                                            className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none focus:border-brand-lime transition-colors ${errors.dueDay ? 'border-red-500' : 'border-brand-gray-200'}`}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Color Picker */}
                        <div>
                            <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-2 flex items-center gap-2">
                                <Palette size={14} /> Cor do Cartão/Icone
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {COLORS.map((c) => (
                                    <button
                                        key={c.hex}
                                        type="button"
                                        onClick={() => setColor(c.hex)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c.hex ? 'border-brand-lime scale-110 shadow-md' : 'border-transparent'}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-brand-gray-100 flex-shrink-0 bg-gray-50 md:rounded-b-2xl">
                    <button
                        type="submit"
                        form="account-form"
                        className="w-full py-3 rounded-xl bg-brand-black text-brand-lime font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={20} />
                        {type === 'account' ? 'Salvar Conta' : 'Salvar Cartão'}
                    </button>
                </div>
            </div>
        </div>
    );
}
