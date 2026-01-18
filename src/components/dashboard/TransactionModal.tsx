import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useLayout } from '../../context/LayoutContext';
import type { TransactionType } from '../../types';
import { Toast } from '../ui/Toast';

export function TransactionModal() {
    const { isTransactionModalOpen, closeTransactionModal } = useLayout();
    const { addTransaction, accounts, creditCards } = useFinance();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>('EXPENSE');
    const [category, setCategory] = useState('');
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [installments, setInstallments] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // UI State
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    if (!isTransactionModalOpen) return null;

    // Derived logic
    const isCreditCard = creditCards.some(c => c.id === selectedAccount);
    const categories = ['Alimentação', 'Transporte', 'Lazer', 'Contas', 'Educação', 'Investimento', 'Saúde', 'Salário', 'Freelance', 'Outros'];

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!description) newErrors.description = 'Descrição é obrigatória';
        if (!amount || Number(amount) <= 0) newErrors.amount = 'Valor inválido';
        if (!category && !isCustomCategory) newErrors.category = 'Selecione uma categoria';
        if (isCustomCategory && !category) newErrors.category = 'Informe a categoria';
        if (!selectedAccount) newErrors.account = 'Selecione a conta/cartão';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            addTransaction({
                description,
                amount: Number(amount),
                type,
                date: new Date(date).toISOString(),
                categoryId: category,
                accountId: selectedAccount,
                memberId: null,
                status: 'COMPLETED',
                installmentNumber: isCreditCard && type === 'EXPENSE' ? (installments ? parseInt(installments) : 1) : null,
                totalInstallments: isCreditCard && type === 'EXPENSE' && installments ? parseInt(installments) : 1,
                isRecurring: !isCreditCard && type === 'EXPENSE' && isRecurring,
                parentTransactionId: null,
                recurringTransactionId: null,
                notes: null
            });

            setToast({ message: 'Transação salva com sucesso!', type: 'success' });

            setTimeout(() => {
                setToast(null);
                handleClose();
            }, 1000);
        } catch (error) {
            setToast({ message: 'Erro ao salvar.', type: 'error' });
        }
    };

    const handleClose = () => {
        setDescription('');
        setAmount('');
        setType('EXPENSE');
        setCategory('');
        setSelectedAccount('');
        setInstallments('');
        setIsRecurring(false);
        setErrors({});
        closeTransactionModal();
    };

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Overlay with fade animation */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-overlay-fade"
                onClick={handleClose}
            />

            {/* Modal with scale-in animation */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
                    {/* Header */}
                    <div className="p-4 border-b border-brand-gray-100 flex justify-between items-center bg-white flex-shrink-0">
                        <h2 className="text-xl font-bold text-brand-black">Nova Transação</h2>
                        <button onClick={handleClose} className="p-2 hover:bg-brand-gray-100 rounded-full transition-all hover:scale-110">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <form id="transaction-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Type Toggle */}
                            <div className="flex p-1 bg-brand-gray-100 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setType('EXPENSE')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${type === 'EXPENSE' ? 'bg-white shadow text-red-600' : 'text-brand-gray-500'}`}
                                >
                                    Despesa
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('INCOME')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${type === 'INCOME' ? 'bg-white shadow text-green-600' : 'text-brand-gray-500'}`}
                                >
                                    Receita
                                </button>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Valor</label>
                                <div className={`flex items-center gap-2 border-b-2 py-2 transition-colors ${errors.amount ? 'border-red-500' : 'border-brand-gray-200 focus-within:border-brand-lime'}`}>
                                    <span className="text-2xl font-bold text-brand-gray-400">R$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0,00"
                                        className="w-full text-4xl font-bold text-brand-black outline-none placeholder:text-brand-gray-200 bg-transparent"
                                    />
                                </div>
                                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Descrição</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ex: Compras no Mercado"
                                    className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none transition-colors ${errors.description ? 'border-red-500' : 'border-brand-gray-200 focus:border-brand-lime'}`}
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Categoria</label>
                                <div className="flex gap-2">
                                    {isCustomCategory ? (
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Nome da nova categoria"
                                            className={`flex-1 p-3 bg-brand-gray-50 rounded-xl border outline-none transition-colors ${errors.category ? 'border-red-500' : 'border-brand-gray-200 focus:border-brand-lime'}`}
                                            autoFocus
                                        />
                                    ) : (
                                        <select
                                            value={category}
                                            onChange={(e) => {
                                                if (e.target.value === 'new') setIsCustomCategory(true);
                                                else setCategory(e.target.value);
                                            }}
                                            className={`flex-1 p-3 bg-brand-gray-50 rounded-xl border outline-none transition-colors appearance-none ${errors.category ? 'border-red-500' : 'border-brand-gray-200 focus:border-brand-lime'}`}
                                        >
                                            <option value="">Selecione...</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                            <option value="new" className="font-bold">+ Criar Nova</option>
                                        </select>
                                    )}
                                    {isCustomCategory && (
                                        <button
                                            type="button"
                                            onClick={() => { setIsCustomCategory(false); setCategory(''); }}
                                            className="p-3 bg-brand-gray-100 rounded-xl hover:bg-brand-gray-200 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                            </div>

                            {/* Account/Card */}
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Conta / Cartão</label>
                                <select
                                    value={selectedAccount}
                                    onChange={(e) => {
                                        setSelectedAccount(e.target.value);
                                        setInstallments('');
                                        setIsRecurring(false);
                                    }}
                                    className={`w-full p-3 bg-brand-gray-50 rounded-xl border outline-none transition-colors appearance-none ${errors.account ? 'border-red-500' : 'border-brand-gray-200 focus:border-brand-lime'}`}
                                >
                                    <option value="">Selecione...</option>
                                    <optgroup label="Contas">
                                        {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} ({acc.type})</option>)}
                                    </optgroup>
                                </select>
                                {errors.account && <p className="text-xs text-red-500 mt-1">{errors.account}</p>}
                            </div>

                            {/* Installments (Credit Card Only) */}
                            {isCreditCard && type === 'EXPENSE' && (
                                <div className="animate-slide-up">
                                    <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Parcelas</label>
                                    <select
                                        value={installments}
                                        onChange={(e) => setInstallments(e.target.value)}
                                        className="w-full p-3 bg-brand-gray-50 rounded-xl border border-brand-gray-200 outline-none focus:border-brand-lime transition-colors appearance-none"
                                    >
                                        <option value="">À vista (1x)</option>
                                        {Array.from({ length: 11 }).map((_, i) => (
                                            <option key={i} value={`${i + 2}x`}>{i + 2}x</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Recurring (Account Only) */}
                            {!isCreditCard && type === 'EXPENSE' && (
                                <div className="flex items-center gap-3 p-3 bg-brand-gray-50 rounded-xl border border-brand-gray-200 animate-slide-up cursor-pointer" onClick={() => setIsRecurring(!isRecurring)}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isRecurring ? 'bg-brand-lime border-brand-lime' : 'border-brand-gray-400 bg-white'}`}>
                                        {isRecurring && <Check size={14} className="text-brand-black" />}
                                    </div>
                                    <span className="text-sm font-medium text-brand-gray-700">Despesa Recorrente (Mensal)</span>
                                </div>
                            )}

                            {/* Date */}
                            <div>
                                <label className="block text-xs font-bold text-brand-gray-500 uppercase mb-1">Data</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-3 bg-brand-gray-50 rounded-xl border border-brand-gray-200 outline-none focus:border-brand-lime transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-brand-gray-100 flex-shrink-0 bg-white">
                        <button
                            type="submit"
                            form="transaction-form"
                            className="w-full py-4 rounded-xl bg-brand-black text-brand-lime font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Check size={24} />
                            Salvar Transação
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
