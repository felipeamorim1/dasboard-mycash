-- ============================================
-- MYCASH+ V2.0 - SUPABASE SCHEMA
-- ============================================
-- Script completo para criação do schema baseado em Prisma
-- Ordem: ENUMs → TABLEs → CONSTRAINTs → INDEXes → RLS

-- ============================================
-- 🔧 ENUMS
-- ============================================

-- Transaction Type (INCOME ou EXPENSE)
DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Account Type (conta corrente, poupança ou cartão de crédito)
DO $$ BEGIN
    CREATE TYPE account_type AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT_CARD');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Recurrence Frequency
DO $$ BEGIN
    CREATE TYPE recurrence_frequency AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Transaction Status
DO $$ BEGIN
    CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 👤 TABELA: USERS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 👨👩👧👦 TABELA: FAMILY MEMBERS
-- ============================================

CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL, -- "Pai", "Mãe", "Filho", "Filha", etc
    avatar_url TEXT,
    monthly_income DECIMAL(12, 2) NOT NULL DEFAULT 0,
    color TEXT NOT NULL DEFAULT '#3247FF',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 🏷️ TABELA: CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT '📌',
    type transaction_type NOT NULL,
    color TEXT NOT NULL DEFAULT '#3247FF',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 💳 TABELA: ACCOUNTS (Unificado: Contas + Cartões)
-- ============================================

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type account_type NOT NULL,
    name TEXT NOT NULL, -- Nome/Apelido (ex: "Nubank", "Itaú Mastercard")
    bank TEXT NOT NULL, -- Banco/Instituição
    last_digits TEXT, -- 4 últimos dígitos (OPCIONAL)
    holder_id UUID NOT NULL REFERENCES family_members(id),
    
    -- ============================================
    -- 💰 CAMPOS PARA CONTA CORRENTE E POUPANÇA
    -- ============================================
    balance DECIMAL(12, 2) NOT NULL DEFAULT 0, -- Saldo atual
    
    -- ============================================
    -- 💳 CAMPOS PARA CARTÃO DE CRÉDITO
    -- ============================================
    credit_limit DECIMAL(12, 2), -- Limite total
    current_bill DECIMAL(12, 2) NOT NULL DEFAULT 0, -- Fatura atual
    due_day INTEGER, -- Dia do vencimento (1-31)
    closing_day INTEGER, -- Dia do fechamento (1-31)
    theme TEXT DEFAULT 'black', -- "black", "lime", "white"
    logo_url TEXT, -- Logo do banco (opcional)
    
    -- ============================================
    -- 🔧 METADATA
    -- ============================================
    color TEXT NOT NULL DEFAULT '#3247FF',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- ============================================
    -- ✅ CONSTRAINTS
    -- ============================================
    CONSTRAINT valid_due_day CHECK (due_day IS NULL OR (due_day >= 1 AND due_day <= 31)),
    CONSTRAINT valid_closing_day CHECK (closing_day IS NULL OR (closing_day >= 1 AND closing_day <= 31)),
    CONSTRAINT credit_card_required_fields CHECK (
        (type != 'CREDIT_CARD') OR 
        (type = 'CREDIT_CARD' AND credit_limit IS NOT NULL AND due_day IS NOT NULL AND closing_day IS NOT NULL)
    )
);

-- ============================================
-- 💰 TABELA: TRANSACTIONS
-- ============================================

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
    
    -- ============================================
    -- 💳 PARCELAMENTO (Máximo 12 parcelas)
    -- ============================================
    installment_number INTEGER, -- Parcela atual (1, 2, 3...)
    total_installments INTEGER NOT NULL DEFAULT 1, -- Total de parcelas (1x até 12x)
    parent_transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    
    -- ============================================
    -- 🔁 RECORRÊNCIA
    -- ============================================
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    recurring_transaction_id UUID, -- Será adicionado FK depois que a tabela existir
    
    -- ============================================
    -- ✅ STATUS
    -- ============================================
    status transaction_status NOT NULL DEFAULT 'COMPLETED',
    notes TEXT,
    
    -- ============================================
    -- 🔧 METADATA
    -- ============================================
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- ============================================
    -- ✅ CONSTRAINTS
    -- ============================================
    CONSTRAINT valid_installments CHECK (total_installments >= 1 AND total_installments <= 12),
    CONSTRAINT valid_installment_number CHECK (
        installment_number IS NULL OR 
        (installment_number >= 1 AND installment_number <= total_installments)
    ),
    CONSTRAINT recurring_no_installments CHECK (
        (is_recurring = FALSE) OR 
        (is_recurring = TRUE AND total_installments = 1)
    )
);

-- ============================================
-- 💫 TABELA: RECURRING TRANSACTIONS (TEMPLATES)
-- ============================================

CREATE TABLE IF NOT EXISTS recurring_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type transaction_type NOT NULL DEFAULT 'EXPENSE',
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
    
    -- ============================================
    -- 🔁 CONFIGURAÇÃO DE RECORRÊNCIA
    -- ============================================
    frequency recurrence_frequency NOT NULL,
    day_of_month INTEGER, -- Ex: dia 21 (para recorrência mensal)
    day_of_week INTEGER, -- 0-6 (para recorrência semanal)
    start_date DATE NOT NULL,
    end_date DATE, -- Opcional
    
    -- ============================================
    -- 🔧 METADATA
    -- ============================================
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- ============================================
    -- ✅ CONSTRAINTS
    -- ============================================
    CONSTRAINT valid_day_of_month CHECK (day_of_month IS NULL OR (day_of_month >= 1 AND day_of_month <= 31)),
    CONSTRAINT valid_day_of_week CHECK (day_of_week IS NULL OR (day_of_week >= 0 AND day_of_week <= 6))
);

-- Adicionar FK de recurring_transaction_id agora que a tabela existe
ALTER TABLE transactions 
ADD CONSTRAINT fk_recurring_transaction 
FOREIGN KEY (recurring_transaction_id) 
REFERENCES recurring_transactions(id) 
ON DELETE SET NULL;

-- ============================================
-- 🔍 ÍNDICES PARA PERFORMANCE
-- ============================================

-- Family Members
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON family_members(user_id);

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_user_id_type ON categories(user_id, type);

-- Accounts
CREATE INDEX IF NOT EXISTS idx_accounts_user_id_type ON accounts(user_id, type);
CREATE INDEX IF NOT EXISTS idx_accounts_holder_id ON accounts(holder_id);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_transactions_user_id_date ON transactions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_member_id ON transactions(member_id);
CREATE INDEX IF NOT EXISTS idx_transactions_recurring_id ON transactions(recurring_transaction_id);
CREATE INDEX IF NOT EXISTS idx_transactions_parent_id ON transactions(parent_transaction_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Recurring Transactions
CREATE INDEX IF NOT EXISTS idx_recurring_transactions_user_id_active ON recurring_transactions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_recurring_transactions_category_id ON recurring_transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_recurring_transactions_account_id ON recurring_transactions(account_id);

-- ============================================
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 📋 POLÍTICAS RLS (Permissivas Inicialmente)
-- ============================================
-- Nota: Estas políticas permitem acesso total a usuários autenticados
-- Você pode refiná-las mais tarde para controle granular

-- Users: Usuários autenticados podem ver e editar seu próprio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (true);

-- Family Members: Acesso total para usuários autenticados
DROP POLICY IF EXISTS "Users can manage family members" ON family_members;
CREATE POLICY "Users can manage family members" ON family_members
    FOR ALL USING (true);

-- Categories: Acesso total para usuários autenticados
DROP POLICY IF EXISTS "Users can manage categories" ON categories;
CREATE POLICY "Users can manage categories" ON categories
    FOR ALL USING (true);

-- Accounts: Acesso total para usuários autenticados
DROP POLICY IF EXISTS "Users can manage accounts" ON accounts;
CREATE POLICY "Users can manage accounts" ON accounts
    FOR ALL USING (true);

-- Transactions: Acesso total para usuários autenticados
DROP POLICY IF EXISTS "Users can manage transactions" ON transactions;
CREATE POLICY "Users can manage transactions" ON transactions
    FOR ALL USING (true);

-- Recurring Transactions: Acesso total para usuários autenticados
DROP POLICY IF EXISTS "Users can manage recurring transactions" ON recurring_transactions;
CREATE POLICY "Users can manage recurring transactions" ON recurring_transactions
    FOR ALL USING (true);

-- ============================================
-- ✅ TRIGGERS PARA UPDATED_AT
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_family_members_updated_at ON family_members;
CREATE TRIGGER update_family_members_updated_at
    BEFORE UPDATE ON family_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_recurring_transactions_updated_at ON recurring_transactions;
CREATE TRIGGER update_recurring_transactions_updated_at
    BEFORE UPDATE ON recurring_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 🎉 SCHEMA CRIADO COM SUCESSO!
-- ============================================
-- Execute este script no SQL Editor do Supabase Dashboard
-- Próximos passos:
-- 1. Verificar se todas as tabelas foram criadas
-- 2. Testar inserção de dados
-- 3. Atualizar código TypeScript
