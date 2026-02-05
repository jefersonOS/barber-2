# BarberOS

SaaS para barbearias com agendamento via WhatsApp (Evolution), cobrança de sinal via Stripe e gestão multi-tenant no painel web.

## Requisitos

- Node.js 18+
- Conta Supabase (Postgres)
- Conta Stripe

## Configuração

Crie um arquivo `.env.local` na raiz com as variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
```

Para criar as tabelas, aplique o script em [supabase/schema.sql](supabase/schema.sql).

## Desenvolvimento

```
npm run dev
```

## Rotas principais

- Landing: `/`
- Login: `/login`
- Painel: `/dashboard`
- Owner: `/owner/companies`
- Empresa: `/company/dashboard`
- Profissionais: `/company/professionals`
- Serviços: `/company/services`
- Unidades: `/company/units`
- Agenda: `/company/appointments`
- Relatórios: `/company/reports`

## Webhooks

- Evolution: `POST /api/webhooks/evolution`
- Stripe Checkout: `POST /api/stripe/checkout`

## Observações

Este projeto inclui páginas e endpoints base para evoluir a autenticação, autorização e automações de agendamento.
