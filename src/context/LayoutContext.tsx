import { createContext, useContext, useState, type ReactNode } from 'react';

interface LayoutContextType {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    isTransactionModalOpen: boolean;
    openTransactionModal: () => void;
    closeTransactionModal: () => void;
    isMemberModalOpen: boolean;
    openMemberModal: () => void;
    closeMemberModal: () => void;
    isAccountModalOpen: boolean;
    openAccountModal: () => void;
    closeAccountModal: () => void;
    selectedCardId: string | null;
    openCardDetailsModal: (cardId: string) => void;
    closeCardDetailsModal: () => void;
    isMobileFilterOpen: boolean;
    openMobileFilter: () => void;
    closeMobileFilter: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    const openTransactionModal = () => setIsTransactionModalOpen(true);
    const closeTransactionModal = () => setIsTransactionModalOpen(false);

    const openMemberModal = () => setIsMemberModalOpen(true);
    const closeMemberModal = () => setIsMemberModalOpen(false);

    const openAccountModal = () => setIsAccountModalOpen(true);
    const closeAccountModal = () => setIsAccountModalOpen(false);

    const openCardDetailsModal = (cardId: string) => setSelectedCardId(cardId);
    const closeCardDetailsModal = () => setSelectedCardId(null);

    const openMobileFilter = () => setIsMobileFilterOpen(true);
    const closeMobileFilter = () => setIsMobileFilterOpen(false);

    return (
        <LayoutContext.Provider value={{
            isSidebarCollapsed,
            toggleSidebar,
            isMobileMenuOpen,
            toggleMobileMenu,
            isTransactionModalOpen,
            openTransactionModal,
            closeTransactionModal,
            isMemberModalOpen,
            openMemberModal,
            closeMemberModal,
            isAccountModalOpen,
            openAccountModal,
            closeAccountModal,
            selectedCardId,
            openCardDetailsModal,
            closeCardDetailsModal,
            isMobileFilterOpen,
            openMobileFilter,
            closeMobileFilter
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
