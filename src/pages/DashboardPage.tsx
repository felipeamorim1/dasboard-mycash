import { useFinance } from '../context/FinanceContext';
import { KPICard } from '../components/dashboard/KPICard';
import { FinancialChart } from '../components/dashboard/FinancialChart';
// import { TransactionList } from '../components/dashboard/TransactionList'; // Kept in file system but removed from view for now
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { CategoryCarousel } from '../components/dashboard/CategoryCarousel';
import { CreditCardWidget } from '../components/dashboard/CreditCardWidget';
import { UpcomingExpensesWidget } from '../components/dashboard/UpcomingExpensesWidget';
import { TransactionTable } from '../components/dashboard/TransactionTable';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export function DashboardPage() {
    const { totalBalance, totalIncome, totalExpenses } = useFinance();

    return (
        <div className="p-4 md:p-6 ml-0 md:ml-64 space-y-6">
            {/* Header Section */}
            <DashboardHeader />

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Saldo Total"
                    value={totalBalance}
                    icon={Wallet}
                    variant="primary"
                    trend={{ value: 12, isPositive: true }}
                />
                <KPICard
                    title="Receitas"
                    value={totalIncome}
                    icon={TrendingUp}
                    trend={{ value: 8, isPositive: true }}
                />
                <KPICard
                    title="Despesas"
                    value={totalExpenses}
                    icon={TrendingDown}
                    trend={{ value: 2, isPositive: false }}
                />
                <KPICard
                    title="Investimentos"
                    value={15000}
                    icon={PiggyBank}
                    trend={{ value: 5, isPositive: true }}
                />
            </div>

            {/* Category Carousel Section */}
            <div>
                <h2 className="text-lg font-bold text-text-primary mb-3">Gastos por Categoria</h2>
                <CategoryCarousel />
            </div>

            {/* Main Charts & Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Chart Section (Takes 2 cols on Desktop) */}
                <div className="lg:col-span-2 h-[450px]">
                    <FinancialChart />
                </div>

                {/* Credit Cards (Takes 1 col) */}
                <div className="lg:col-span-1 h-[450px]">
                    <CreditCardWidget />
                </div>

                {/* Upcoming Expenses (Takes 1 col - Replaces TransactionList for now or placed alongside?) 
                    The Prompt 14 Layout had 4 columns.
                    Cols: Chart(2) | CreditCard(1) | TransactionList(1).
                    Let's adjust. The request doesn't explicitly delete TransactionList but prompts usually build on each other.
                    Prompt 15 says "Create chronological list".
                    Wait, `grid-cols-4` set in Prompt 14.
                    
                    Let's Put Upcoming Expenses in the 4th column, replacing specific transaction list, 
                    OR maybe the user wants 4 columns: Chart(2), Cards(1), Expenses(1).
                    The TransactionList was in the 4th column.
                    Let's replace TransactionList with UpcomingExpensesWidget as "Upcoming" is more "Dashboardy" 
                    than a raw history list which usually has its own page or a larger section.
                    
                    Actually, looking at standard dashboards:
                    [     Chart (2)    ] [ Cards (1) ] [ Upcoming (1) ]
                    
                    So I will replace TransactionList with UpcomingExpensesWidget in the grid.
                    Wait, Prompt 14 said:
                    Chart (2) | CreditCard (1) | TransactionList (1) = 4 cols.
                    
                    I will replace TransactionList with UpcomingExpensesWidget.
                */}
                <div className="lg:col-span-1 h-[450px]">
                    <UpcomingExpensesWidget />
                </div>
            </div>

            {/* Detailed Transaction Statement */}
            <div className="w-full">
                <TransactionTable />
            </div>
        </div>
    );
}
