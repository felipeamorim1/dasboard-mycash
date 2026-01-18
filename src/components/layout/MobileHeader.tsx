import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, LogOut, Plus } from 'lucide-react';
import { useLayout } from '../../context/LayoutContext';
import { NAV_ITEMS } from '../../constants/navigation';

export function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openTransactionModal } = useLayout();
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Close menu when clicking escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-16 bg-ui-card border-b border-ui-border px-4 flex items-center justify-between z-40 lg:hidden user-select-none">
                {/* Logo */}
                <div className="font-bold text-xl text-brand-black">
                    mycash<span className="text-brand-lime">+</span>
                </div>

                {/* Avatar Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 rounded-full bg-brand-gray-200 border-2 border-transparent focus:border-brand-lime focus:outline-none overflow-hidden relative"
                >
                    <img src="https://ui-avatars.com/api/?name=Felipe+Amorim&background=random" alt="User" />
                </button>
            </header>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-brand-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Dropdown Menu (Slide Down) */}
            <div
                className={`
                    fixed top-0 left-0 right-0 bg-ui-card z-50 lg:hidden
                    transform transition-transform duration-300 ease-in-out shadow-xl rounded-b-2xl
                    ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                `}
            >
                <div className="p-4 pt-20 pb-6 flex flex-col gap-2">
                    {/* User Info Header in Menu */}
                    <div className="flex items-center gap-3 p-3 mb-2 border-b border-ui-border pb-4">
                        <div className="w-12 h-12 rounded-full bg-brand-gray-200 shrink-0 overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Felipe+Amorim&background=random" alt="User" />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-text-primary">Felipe Amorim</p>
                            <p className="text-sm text-text-secondary">felipe@example.com</p>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="ml-auto p-2 text-text-secondary hover:text-brand-black"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* New Transaction Button (Mobile) */}
                    <button
                        onClick={() => {
                            openTransactionModal();
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-brand-black text-brand-lime py-4 rounded-xl shadow-lg mb-2 active:scale-95 transition-all"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span className="font-bold text-lg">Nova Transação</span>
                    </button>

                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-4 p-4 rounded-xl transition-colors
                                    ${isActive
                                        ? 'bg-brand-black text-text-inverse'
                                        : 'text-text-secondary hover:bg-brand-gray-50 hover:text-text-primary'}
                                `}
                            >
                                <div className={`${isActive ? 'text-brand-lime' : 'text-current'}`}>
                                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className="font-medium text-lg">{item.name}</span>
                            </NavLink>
                        );
                    })}

                    <button className="flex items-center gap-4 p-4 rounded-xl text-status-danger hover:bg-red-50 mt-2 transition-colors w-full text-left">
                        <LogOut size={24} />
                        <span className="font-medium text-lg">Sair</span>
                    </button>
                </div>
            </div>
        </>
    );
}
