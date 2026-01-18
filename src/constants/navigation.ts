import { LayoutDashboard, Target, CreditCard, ArrowRightLeft, User } from 'lucide-react';

export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Objetivos', path: '/goals', icon: Target },
    { name: 'Cartões', path: '/cards', icon: CreditCard },
    { name: 'Transações', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Perfil', path: '/profile', icon: User },
];
