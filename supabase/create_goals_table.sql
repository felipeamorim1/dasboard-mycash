-- ============================================
-- GOALS TABLE - MYCASH+ V2.0
-- ============================================
-- Tabela para gerenciar metas financeiras

CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL,
    current_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    deadline DATE NOT NULL,
    icon TEXT DEFAULT '🎯',
    color TEXT NOT NULL DEFAULT '#3247FF',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- ============================================
    -- ✅ CONSTRAINTS
    -- ============================================
    CONSTRAINT positive_target_amount CHECK (target_amount > 0),
    CONSTRAINT non_negative_current_amount CHECK (current_amount >= 0),
    CONSTRAINT current_not_exceeds_target CHECK (current_amount <= target_amount * 1.5)
);

-- ============================================
-- 🔍 ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_goals_user_id_active ON goals(user_id, is_active);

-- ============================================
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage goals" ON goals;
CREATE POLICY "Users can manage goals" ON goals
    FOR ALL USING (true);

-- ============================================
-- ✅ TRIGGER PARA UPDATED_AT
-- ============================================

DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
CREATE TRIGGER update_goals_updated_at
    BEFORE UPDATE ON goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 🎯 GOALS TABLE CRIADA COM SUCESSO!
-- ============================================
