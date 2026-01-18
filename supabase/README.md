# Migração Supabase - MyCash+ v2.0

Este diretório contém os scripts SQL para criar e popular o banco de dados PostgreSQL no Supabase.

## 📋 Ordem de Execução

### 1. **create_schema.sql** (OBRIGATÓRIO)
Cria toda a estrutura do banco de dados:
- ✅ ENUMs (tipos personalizados)
- ✅ Tabelas (users, family_members, categories, accounts, transactions, recurring_transactions)
- ✅ Constraints e validações
- ✅ Índices para performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers para updated_at

**Como executar:**
1. Abra o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **SQL Editor**
3. Cole o conteúdo de `create_schema.sql`
4. Clique em **Run**

### 2. **seed_data.sql** (OPCIONAL)
Popula o banco com dados de exemplo para desenvolvimento:
- 1 usuário
- 3 membros da família
- 12 categorias (8 despesas + 4 receitas)
- 6 contas/cartões
- 5 transações de exemplo

**Como executar:**
1. Abra o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **SQL Editor**
3. Cole o conteúdo de `seed_data.sql`
4. Clique em **Run**

## 🔍 Verificação

Após executar os scripts, verifique se tudo foi criado corretamente:

### Via SQL Editor:
```sql
-- Listar todas as tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Contar registros em cada tabela
SELECT 
    'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'family_members', COUNT(*) FROM family_members
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'accounts', COUNT(*) FROM accounts
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions;
```

### Via Table Editor:
1. Vá em **Table Editor** no Supabase Dashboard
2. Você deve ver 6 tabelas:
   - `users`
   - `family_members`
   - `categories`
   - `accounts`
   - `transactions`
   - `recurring_transactions`

## 🔒 Row Level Security (RLS)

As políticas RLS estão configuradas de forma **permissiva inicialmente**, permitindo acesso total a usuários autenticados.

Para refinar as políticas posteriormente:
1. Vá em **Authentication** → **Policies** no Supabase Dashboard
2. Edite as políticas de cada tabela conforme necessário

## 📊 Schema Overview

```
users (👤 Usuários)
  └── family_members (👨👩👧👦 Membros da Família)
       └── accounts (💳 Contas e Cartões) [holder_id]
  └── categories (🏷️ Categorias)
  └── accounts (💳 Contas e Cartões) [user_id]
  └── transactions (💰 Transações)
       └── categories (🏷️ Categorias) [category_id]
       └── accounts (💳 Contas) [account_id]
       └── family_members (👤 Membro) [member_id]
  └── recurring_transactions (💫 Templates de Recorrência)
```

## 🚀 Próximos Passos

Após executar os scripts:
1. ✅ Execute `create_schema.sql`
2. ✅ Execute `seed_data.sql` (opcional)
3. ✅ Verifique as tabelas no Table Editor
4. ✅ Inicie o app: `npm run dev`
5. ✅ Verifique o console do navegador para erros
6. ✅ Teste CRUD de transações
