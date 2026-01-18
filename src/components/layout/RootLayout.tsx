import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { LayoutProvider, useLayout } from '../../context/LayoutContext';
import { TransactionModal } from '../dashboard/TransactionModal';
import { MemberModal } from '../dashboard/MemberModal';
import { AccountModal } from '../dashboard/AccountModal';
import { CardDetailsModal } from '../dashboard/CardDetailsModal';
import { MobileFilterModal } from '../dashboard/MobileFilterModal';

function RootLayoutContent({ children }: { children: React.ReactNode }) {
    const { isSidebarCollapsed } = useLayout();

    return (
        <div className="min-h-screen bg-brand-gray-50 flex flex-col">
            {/* Mobile Header (Hidden on Desktop) */}
            <MobileHeader />

            {/* Sidebar (Hidden on Mobile) */}
            <Sidebar />

            {/* Main Content Area */}
            {/* 
        Padding Left logic:
        - Mobile (< lg): pl-0
        - Desktop (>= lg): pl-64 (expanded) OR pl-20 (collapsed)
      */}
            <main
                className={`
          flex-1 w-full pt-16 lg:pt-0 
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
            >
                <div className="max-w-desktop xl:max-w-wide mx-auto p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Global Modals */}
            <TransactionModal />
            <MemberModal />
            <AccountModal />
            <CardDetailsModal />
            <MobileFilterModal />
        </div>
    );
}

export function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
        </LayoutProvider>
    );
}
