-- Schema base para SaaS de barbearia (Supabase/Postgres)
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'starter',
  created_at timestamp with time zone default now()
);

create table if not exists users (
  id uuid primary key,
  company_id uuid references companies(id) on delete set null,
  role text not null,
  full_name text,
  created_at timestamp with time zone default now()
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  city text,
  created_at timestamp with time zone default now()
);

create table if not exists professionals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  name text not null,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  price_cents integer not null,
  duration_minutes integer not null,
  created_at timestamp with time zone default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamp with time zone default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  unit_id uuid references units(id) on delete set null,
  professional_id uuid references professionals(id) on delete set null,
  client_id uuid references clients(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  scheduled_at timestamp with time zone not null,
  status text not null default 'pending',
  signal_paid boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references appointments(id) on delete cascade,
  provider text not null default 'stripe',
  amount_cents integer not null,
  status text not null,
  external_id text,
  created_at timestamp with time zone default now()
);
