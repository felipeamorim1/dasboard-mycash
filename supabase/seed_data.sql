-- ============================================
-- SEED DATA - MYCASH+ V2.0 (CORRIGIDO)
-- ============================================
-- Script para popular banco com dados de exemplo
-- Execute APÓS o create_schema.sql

-- ============================================
-- 👤 USER DE EXEMPLO
-- ============================================

INSERT INTO users (id, email, name, avatar_url)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'felipe@mycash.com',
    'Felipe Amorim',
    'https://ui-avatars.com/api/?name=Felipe+Amorim&background=ccff00&color=000000'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 👨👩👧👦 MEMBROS DA FAMÍLIA
-- ============================================

INSERT INTO family_members (id, user_id, name, role, avatar_url, monthly_income, color)
VALUES 
    ('00000000-0000-0000-0001-000000000001'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Felipe Amorim', 'Pai', 'https://ui-avatars.com/api/?name=Felipe+Amorim&background=ccff00&color=000000', 8000.00, '#ccff00'),
    ('00000000-0000-0000-0001-000000000002'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Ana Silva', 'Mãe', 'https://ui-avatars.com/api/?name=Ana+Silva&background=ff6b9d&color=ffffff', 6500.00, '#ff6b9d'),
    ('00000000-0000-0000-0001-000000000003'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'João Silva', 'Filho', 'https://ui-avatars.com/api/?name=Joao+Silva&background=4299e1&color=ffffff', 0, '#4299e1')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 🏷️ CATEGORIAS PADRÃO
-- ============================================

-- Categorias de Despesa
INSERT INTO categories (id, user_id, name, icon, type, color)
VALUES 
    ('00000000-0000-0000-0002-000000000001'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Alimentação', '🍔', 'EXPENSE', '#FF6B6B'),
    ('00000000-0000-0000-0002-000000000002'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Transporte', '🚗', 'EXPENSE', '#4ECDC4'),
    ('00000000-0000-0000-0002-000000000003'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Lazer', '🎮', 'EXPENSE', '#95E1D3'),
    ('00000000-0000-0000-0002-000000000004'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Contas', '💡', 'EXPENSE', '#FFD93D'),
    ('00000000-0000-0000-0002-000000000005'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Educação', '📚', 'EXPENSE', '#6BCF7F'),
    ('00000000-0000-0000-0002-000000000006'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Saúde', '💊', 'EXPENSE', '#F38181'),
    ('00000000-0000-0000-0002-000000000007'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Moradia', '🏠', 'EXPENSE', '#AA96DA'),
    ('00000000-0000-0000-0002-000000000008'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Vestuário', '👔', 'EXPENSE', '#FCBAD3')
ON CONFLICT (id) DO NOTHING;

-- Categorias de Receita
INSERT INTO categories (id, user_id, name, icon, type, color)
VALUES 
    ('00000000-0000-0000-0002-000000000009'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Salário', '💰', 'INCOME', '#22C55E'),
    ('00000000-0000-0000-0002-00000000000A'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Freelance', '💼', 'INCOME', '#3B82F6'),
    ('00000000-0000-0000-0002-00000000000B'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Investimentos', '📈', 'INCOME', '#8B5CF6'),
    ('00000000-0000-0000-0002-00000000000C'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Outros', '💵', 'INCOME', '#64748B')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 💳 CONTAS E CARTÕES
-- ============================================

-- Conta Corrente Nubank
INSERT INTO accounts (id, user_id, type, name, bank, last_digits, holder_id, balance, color)
VALUES (
    '00000000-0000-0000-0003-000000000001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'CHECKING',
    'Conta Nu',
    'Nubank',
    '5897',
    '00000000-0000-0000-0001-000000000001'::uuid,
    5245.00,
    '#8A05BE'
)
ON CONFLICT (id) DO NOTHING;

-- Conta Corrente Inter
INSERT INTO accounts (id, user_id, type, name, bank, last_digits, holder_id, balance, color)
VALUES (
    '00000000-0000-0000-0003-000000000002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'CHECKING',
    'Conta Inter',
    'Inter',
    '4321',
    '00000000-0000-0000-0001-000000000002'::uuid,
    1500.00,
    '#FF7A00'
)
ON CONFLICT (id) DO NOTHING;

-- Poupança XP
INSERT INTO accounts (id, user_id, type, name, bank, holder_id, balance, color)
VALUES (
    '00000000-0000-0000-0003-000000000003'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'SAVINGS',
    'Poupança XP',
    'XP Investimentos',
    '00000000-0000-0000-0001-000000000001'::uuid,
    15000.00,
    '#000000'
)
ON CONFLICT (id) DO NOTHING;

-- Cartão Nubank Platinum
INSERT INTO accounts (id, user_id, type, name, bank, last_digits, holder_id, credit_limit, current_bill, due_day, closing_day, theme, color)
VALUES (
    '00000000-0000-0000-0003-000000000004'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'CREDIT_CARD',
    'Nubank Platinum',
    'Nubank',
    '5897',
    '00000000-0000-0000-0001-000000000001'::uuid,
    8000.00,
    2450.50,
    10,
    3,
    'purple',
    '#8A05BE'
)
ON CONFLICT (id) DO NOTHING;

-- Cartão Inter Black
INSERT INTO accounts (id, user_id, type, name, bank, last_digits, holder_id, credit_limit, current_bill, due_day, closing_day, theme, color)
VALUES (
    '00000000-0000-0000-0003-000000000005'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'CREDIT_CARD',
    'Inter Black',
    'Inter',
    '4765',
    '00000000-0000-0000-0001-000000000002'::uuid,
    12000.00,
    980.00,
    15,
    8,
    'black',
    '#FF7A00'
)
ON CONFLICT (id) DO NOTHING;

-- Cartão XP Visão
INSERT INTO accounts (id, user_id, type, name, bank, last_digits, holder_id, credit_limit, current_bill, due_day, closing_day, theme, color)
VALUES (
    '00000000-0000-0000-0003-000000000006'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'CREDIT_CARD',
    'XP Visão',
    'XP',
    '2356',
    '00000000-0000-0000-0001-000000000001'::uuid,
    25000.00,
    3400.00,
    20,
    13,
    'black',
    '#000000'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 💰 TRANSAÇÕES DE EXEMPLO
-- ============================================

-- Receita: Salário
INSERT INTO transactions (user_id, type, amount, description, date, category_id, account_id, member_id, status)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'INCOME',
    8000.00,
    'Salário Janeiro',
    CURRENT_DATE - INTERVAL '5 days',
    '00000000-0000-0000-0002-000000000009'::uuid,
    '00000000-0000-0000-0003-000000000001'::uuid,
    '00000000-0000-0000-0001-000000000001'::uuid,
    'COMPLETED'
);

-- Despesa: Mercado
INSERT INTO transactions (user_id, type, amount, description, date, category_id, member_id, status)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'EXPENSE',
    450.00,
    'Supermercado Extra',
    CURRENT_DATE - INTERVAL '3 days',
    '00000000-0000-0000-0002-000000000001'::uuid,
    '00000000-0000-0000-0001-000000000002'::uuid,
    'COMPLETED'
);

-- Despesa: Uber
INSERT INTO transactions (user_id, type, amount, description, date, category_id, member_id, status)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'EXPENSE',
    35.50,
    'Uber - Centro',
    CURRENT_DATE - INTERVAL '2 days',
    '00000000-0000-0000-0002-000000000002'::uuid,
    '00000000-0000-0000-0001-000000000001'::uuid,
    'COMPLETED'
);

-- Despesa Pendente: Netflix
INSERT INTO transactions (user_id, type, amount, description, date, category_id, member_id, status, is_recurring)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'EXPENSE',
    55.90,
    'Netflix',
    CURRENT_DATE + INTERVAL '2 days',
    '00000000-0000-0000-0002-000000000003'::uuid,
    '00000000-0000-0000-0001-000000000001'::uuid,
    'PENDING',
    TRUE
);

-- Despesa Pendente: Conta de Luz
INSERT INTO transactions (user_id, type, amount, description, date, category_id, member_id, status)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'EXPENSE',
    350.00,
    'Conta de Luz - Enel',
    CURRENT_DATE + INTERVAL '5 days',
    '00000000-0000-0000-0002-000000000004'::uuid,
    '00000000-0000-0000-0001-000000000001'::uuid,
    'PENDING'
);

-- ============================================
-- ✅ SEED COMPLETO!
-- ============================================
