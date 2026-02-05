-- Schema completo para SaaS de barbearia (Supabase/Postgres)
create extension if not exists "pgcrypto";

do $$ begin
  create type role_t as enum ('owner', 'company_admin', 'professional');
exception
  when duplicate_object then null;
end $$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role role_t not null default 'company_admin',
  created_at timestamp with time zone default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'starter',
  created_by uuid references profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

create table if not exists company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  role role_t not null default 'company_admin',
  active boolean default true,
  created_at timestamp with time zone default now(),
  unique (company_id, user_id)
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  name text not null,
  city text,
  created_at timestamp with time zone default now()
);

create table if not exists professionals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete set null,
  name text not null,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  name text not null,
  price_cents integer not null,
  duration_minutes integer not null,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  name text not null,
  phone text,
  email text,
  created_at timestamp with time zone default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  unit_id uuid references units(id) on delete set null,
  professional_id uuid references professionals(id) on delete set null,
  client_id uuid references clients(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  scheduled_at timestamp with time zone not null,
  ends_at timestamp with time zone,
  status text not null default 'pending',
  signal_paid boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  appointment_id uuid references appointments(id) on delete cascade,
  provider text not null default 'stripe',
  amount_cents integer not null,
  status text not null,
  external_id text,
  created_at timestamp with time zone default now()
);

create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,
  email text not null,
  role role_t not null default 'professional',
  token uuid not null default gen_random_uuid(),
  accepted_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  provider text not null,
  payload jsonb not null,
  processed boolean default false,
  created_at timestamp with time zone default now()
);

create index if not exists idx_company_users_user on company_users(user_id);
create index if not exists idx_units_company on units(company_id);
create index if not exists idx_professionals_company on professionals(company_id);
create index if not exists idx_services_company on services(company_id);
create index if not exists idx_clients_company on clients(company_id);
create index if not exists idx_appointments_company on appointments(company_id);
create index if not exists idx_payments_company on payments(company_id);
create index if not exists idx_invitations_company on invitations(company_id);
create index if not exists idx_invitations_email on invitations(email);

create or replace function is_owner()
returns boolean
language sql
stable
as $$
  select exists(
    select 1 from profiles p where p.id = auth.uid() and p.role = 'owner'
  );
$$;

create or replace function has_company_access(company_id uuid)
returns boolean
language sql
stable
as $$
  select
    is_owner()
    or exists(
      select 1 from company_users cu
      where cu.user_id = auth.uid()
        and cu.company_id = has_company_access.company_id
        and cu.active = true
    );
$$;

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure handle_new_user();

alter table profiles enable row level security;
alter table companies enable row level security;
alter table company_users enable row level security;
alter table units enable row level security;
alter table professionals enable row level security;
alter table services enable row level security;
alter table clients enable row level security;
alter table appointments enable row level security;
alter table payments enable row level security;
alter table invitations enable row level security;
alter table webhook_events enable row level security;

create policy "profiles_self_read" on profiles
  for select using (id = auth.uid() or is_owner());
create policy "profiles_self_update" on profiles
  for update using (id = auth.uid() or is_owner());

create policy "companies_read" on companies
  for select using (has_company_access(id));
create policy "companies_insert" on companies
  for insert with check (is_owner());
create policy "companies_update" on companies
  for update using (is_owner());

create policy "company_users_read" on company_users
  for select using (has_company_access(company_id));
create policy "company_users_insert" on company_users
  for insert with check (has_company_access(company_id));
create policy "company_users_update" on company_users
  for update using (has_company_access(company_id));

create policy "units_read" on units
  for select using (has_company_access(company_id));
create policy "units_write" on units
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "professionals_read" on professionals
  for select using (has_company_access(company_id));
create policy "professionals_write" on professionals
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "services_read" on services
  for select using (has_company_access(company_id));
create policy "services_write" on services
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "clients_read" on clients
  for select using (has_company_access(company_id));
create policy "clients_write" on clients
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "appointments_read" on appointments
  for select using (has_company_access(company_id));
create policy "appointments_write" on appointments
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "payments_read" on payments
  for select using (has_company_access(company_id));
create policy "payments_write" on payments
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "invitations_read" on invitations
  for select using (has_company_access(company_id));
create policy "invitations_write" on invitations
  for all using (has_company_access(company_id)) with check (has_company_access(company_id));

create policy "webhook_events_read" on webhook_events
  for select using (has_company_access(company_id));
create policy "webhook_events_insert" on webhook_events
  for insert with check (has_company_access(company_id));
