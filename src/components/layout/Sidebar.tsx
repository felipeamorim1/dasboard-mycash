import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useLayout } from '../../context/LayoutContext';
import { NAV_ITEMS } from '../../constants/navigation';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
    const { isSidebarCollapsed, toggleSidebar, openTransactionModal } = useLayout();
    const location = useLocation();

    return (
        <aside
            className={`
        fixed left-0 top-0 h-full bg-ui-card border-r border-ui-border z-50
        transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
        hidden lg:flex flex-col
        ${className}
      `}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center px-6 border-b border-ui-border overflow-hidden whitespace-nowrap relative">
                <div className={`font-bold text-2xl text-brand-black transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    mycash<span className="text-brand-lime">+</span>
                </div>
                <div className={`font-bold text-2xl text-brand-black absolute left-6 transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    m<span className="text-brand-lime">+</span>
                </div>
            </div>

            {/* New Transaction Button */}
            <div className="p-4 pb-0">
                <button
                    onClick={openTransactionModal}
                    className={`
                        w-full flex items-center justify-center gap-2 bg-brand-black text-brand-lime rounded-xl 
                        transition-all duration-300 hover:shadow-lg hover:shadow-brand-black/20 hover:scale-[1.02] active:scale-[0.98]
                        ${isSidebarCollapsed ? 'p-3' : 'py-3 px-4'}
                    `}
                >
                    <div className="flex items-center justify-center">
                        <Plus size={20} strokeWidth={3} />
                    </div>
                    <span className={`font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        Nova Transação
                    </span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`
                                flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-brand-black text-text-inverse shadow-lg shadow-brand-black/20'
                                    : 'text-text-secondary hover:bg-brand-gray-100 hover:text-text-primary'}
                            `}
                        >
                            <div className={`w-6 h-6 shrink-0 flex items-center justify-center ${isActive ? 'text-brand-lime' : 'text-current'}`}>
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                {item.name}
                            </span>

                            {/* Tooltip for Collapsed State */}
                            {isSidebarCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-brand-black text-text-inverse text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none shadow-xl translate-x-1 group-hover:translate-x-0">
                                    {item.name}
                                    {/* Tiny arrow */}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-brand-black" />
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-ui-border overflow-hidden">
                <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${!isSidebarCollapsed && 'hover:bg-brand-gray-50'}`}>
                    <div className="w-10 h-10 rounded-full bg-brand-gray-200 shrink-0 border-2 border-white shadow-sm overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Felipe+Amorim&background=random" alt="User" />
                    </div>
                    <div className={`transition-opacity duration-200 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        <p className="text-sm font-bold text-text-primary">Felipe Amorim</p>
                        <p className="text-xs text-text-secondary">Admin</p>
                    </div>
                </div>
            </div>

            {/* Circular Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-24 w-7 h-7 bg-ui-card border border-ui-border rounded-full flex items-center justify-center text-text-secondary hover:text-brand-black hover:border-brand-gray-300 shadow-sm z-50 focus:outline-none transition-all duration-200 hover:scale-110"
            >
                {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </aside>
    );
}
