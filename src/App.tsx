import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { FinanceProvider } from './context/FinanceContext';
import { DashboardPage } from './pages/DashboardPage';
import { CardsPage } from './pages/CardsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ProfilePage } from './pages/ProfilePage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Placeholder Routes */}
        <Route path="/goals" element={<div className="p-6">Metas</div>} />
        <Route path="/reports" element={<div className="p-6">Relatórios</div>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <RootLayout>
          <AnimatedRoutes />
        </RootLayout>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
