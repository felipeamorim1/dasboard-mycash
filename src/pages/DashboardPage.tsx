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
        <div className="h-screen overflow-y-auto p-4 md:p-6 ml-0 md:ml-64">
            <div className="max-w-[1600px] mx-auto space-y-6">
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
                    {/* Chart Section (2 cols on desktop) */}
                    <div className="lg:col-span-2">
                        <FinancialChart />
                    </div>

                    {/* Credit Cards (1 col) */}
                    <div className="lg:col-span-1">
                        <CreditCardWidget />
                    </div>

                    {/* Upcoming Expenses (1 col) */}
                    <div className="lg:col-span-1">
                        <UpcomingExpensesWidget />
                    </div>
                </div>

                {/* Detailed Transaction Statement */}
                <div className="w-full">
                    <TransactionTable />
                </div>
            </div>
        </div>
    );
}
