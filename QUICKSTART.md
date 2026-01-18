# 🚀 Guia Rápido - Execução da Migração

## ⚡ Quick Start (5 minutos)

### Passo 1: Executar Schema SQL
1. Abra: https://supabase.com/dashboard/project/kqssugwdiaefvnfmfflr/sql/new
2. Cole todo o conteúdo de `supabase/create_schema.sql`
3. Clique **RUN** (canto inferior direito)
4. ✅ Deve retornar "Success. No rows returned"

### Passo 2: Popular com Dados de Exemplo (Opcional)
1. No mesmo SQL Editor
2. Cole todo o conteúdo de `supabase/seed_data.sql`
3. Clique **RUN**
4. ✅ Deve inserir ~25 registros

### Passo 3: Verificar Tabelas
1. Vá em: https://supabase.com/dashboard/project/kqssugwdiaefvnfmfflr/editor
2. ✅ Deve ver 6 tabelas no menu lateral:
   - users
   - family_members
   - categories
   - accounts
   - transactions
   - recurring_transactions

### Passo 4: Testar Aplicação
```bash
npm run dev
```

Abra http://localhost:5173 e verifique:
- ✅ Sem erros no console
- ✅ Dashboard carrega
- ✅ Adicionar transação funciona

---

## 🔧 Troubleshooting

### Erro: "relation already exists"
**Solução**: As tabelas já foram criadas. Sem problema, pode continuar.

### Erro: "permission denied"
**Solução**: Verifique se está no projeto correto (`kqssugwdiaefvnfmfflr`).

### App não carrega dados
**Verificar**:
1. Console do navegador (F12) → Procure erros
2. Arquivo `.env` tem as credenciais corretas?
3. Executou `npm run dev` após as alterações?

### Dados não aparecem
**Se NÃO executou seed**: Normal, banco está vazio.  
**Se executou seed**: Verifique no Supabase Table Editor se os dados foram inseridos.

---

## 📋 Checklist de Validação

Após executar tudo:

- [ ] SQL Schema executado sem erros
- [ ] Seed executado (opcional)
- [ ] 6 tabelas visíveis no Table Editor
- [ ] App inicia sem erros (`npm run dev`)
- [ ] Console do navegador sem erros
- [ ] Consegue adicionar uma transação
- [ ] Transação aparece no Supabase Table Editor

---

## 📚 Documentação Completa

Para informações detalhadas, veja:
- [`supabase/README.md`](file:///c:/Users/Felipe/AppData/Roaming/Claude/MyCash/supabase/README.md) - Ordem de execução detalhada
- [`walkthrough.md`](file:///C:/Users/Felipe/.gemini/antigravity/brain/4e870bdf-f042-44f3-a5d8-f1b07d3acfac/walkthrough.md) - Documentação completa da migração
- [`implementation_plan.md`](file:///C:/Users/Felipe/.gemini/antigravity/brain/4e870bdf-f042-44f3-a5d8-f1b07d3acfac/implementation_plan.md) - Plano original de implementação

---

## 🎯 Próximo: Executar os Scripts!

Você está pronto para executar. Siga os 4 passos acima e qualquer problema, consulte o Troubleshooting.
