# mycash+ 💰

**Sistema de gestão financeira familiar** desenvolvido com React, TypeScript e TailwindCSS seguindo os princípios de design ANTIGRAVITY.

## 🎯 Sobre o Projeto

O **mycash+** é uma aplicação moderna para gerenciamento financeiro colaborativo em família, permitindo:

- ✅ Controle de transações (receitas e despesas)
- ✅ Gestão de cartões de crédito com parcelamento
- ✅ Múltiplos membros da família
- ✅ Categorização inteligente
- ✅ Filtros avançados e relatórios visuais
- ✅ Metas financeiras compartilhadas
- ✅ Dashboard interativo com gráficos

## 🚀 Tecnologias

- **React** 18 - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling framework
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Lucide React** - Icon library

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── dashboard/      # Widgets e modais do dashboard
│   ├── layout/         # Layout (Sidebar, Header, RootLayout)
│   └── ui/             # Componentes base (Toast, etc)
├── context/            # React Context (Finance, Layout)
├── pages/              # Páginas da aplicação
│   ├── DashboardPage.tsx
│   ├── CardsPage.tsx
│   ├── TransactionsPage.tsx
│   └── ProfilePage.tsx
├── utils/              # Utilit

ários
│   ├── currency.ts     # Formatação de moeda
│   ├── dates.ts        # Formatação de datas
│   ├── math.ts         # Cálculos matemáticos
│   └── ids.ts          # Geração de UUIDs
├── constants/          # Constantes (navegação, etc)
├── types/              # TypeScript interfaces
└── styles/             # Estilos globais e animações
```

## 🎨 Design System (ANTIGRAVITY)

O projeto segue uma hierarquia de tokens de design:

- **Primitives**: Cores base (`lime-brand`, `black-brand`, grays)
- **Semantics**: Uso contextual (`ui-bg`, `text-primary`, `status-success`)
- **Components**: Componentes específicos reutilizáveis

### Breakpoints Responsivos

- **Mobile**: < 768px
- **Tablet**: 768px - 1279px
- **Desktop**: ≥ 1280px (Sidebar visível)
- **Wide/4K**: ≥ 1920px

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd MyCash

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (Vite)
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## 📊 Funcionalidades Principais

### 1. Dashboard
- Visão geral de saldo, receitas e despesas
- Gráficos interativos (barras, área, rosca)
- Cards de resumo financeiro
- Filtros por membro da família

### 2. Transações
- Criação de transações (receita/despesa)
- Suporte a parcelamento (cartões de crédito)
- Transações recorrentes
- Filtros avançados (categoria, membro, período, status)
- Exportação simulada (CSV/PDF)

### 3. Cartões de Crédito
- Gerenciamento de múltiplos cartões
- Visualização de limite e fatura
- Acompanhamento de vencimentos
- Progress bar de uso

### 4. Perfil
- Informações do usuário
- Lista de membros da família
- Configurações (notificações, categorias)
- Privacidade (exportar/limpar dados)

## 🎭 Animações e Transições

O projeto inclui um sistema completo de animações:

- **Page Transitions**: Fade-in suave entre páginas (0.4s)
- **Modal Animations**: Scale-in + overlay fade (0.3s)
- **Micro-interactions**: Hover, focus, active states
- **Stagger Effects**: Delays em cascata para listas
- **Acessibilidade**: Suporte a `prefers-reduced-motion`

## 🧪 Utilitários

### Formatação de Moeda
```typescript
formatCurrency(1234.56) // "R$ 1.234,56"
formatCompactCurrency(1234567) // "R$ 1,2 mi"
```

### Formatação de Datas
```typescript
formatDate(new Date()) // "18/01/2026"
formatRelativeDate(new Date()) // "Hoje"
```

### Cálculos Matemáticos
```typescript
calculatePercentage(25, 100) // 25
calculateInstallmentValue(1000, 10) // 100.00
```

### Geração de IDs
```typescript
generateUniqueId() // "a3bb189e-8bf9-3888-9912-ace4e6543002"
```

## 🔮 Pontos para Integração Futura

### Supabase Backend
1. **Autenticação**: Substituir mock user por Supabase Auth
2. **Database**: Migrar Context para queries Supabase
   - Tabelas: `users`, `transactions`, `credit_cards`, `accounts`, `goals`
3. **Real-time**: Sincronização em tempo real entre membros
4. **Storage**: Upload de avatares e comprovantes

### Features Planejadas
- [ ] Notificações push (vencimentos, metas)
- [ ] Relatórios PDF reais
- [ ] Importação de OFX/CSV bancário
- [ ] Integração com Open Banking
- [ ] PWA (Progressive Web App)
- [ ] Dark mode

## 📦 Componentes Criados

O projeto contém **30+ componentes** organizados em:

- **Layout**: 3 componentes (Sidebar, Header, RootLayout)
- **Dashboard**: 15+ widgets e modais
- **Pages**: 5 páginas principais
- **UI**: Componentes base reutilizáveis
- **Context Providers**: 2 (Finance, Layout)

## 👥 Contribuindo

Este é um projeto de demonstração, mas contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**
