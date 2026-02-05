-- Seed inicial (substitua os UUIDs pelos IDs reais do seu projeto)
-- Exemplo de empresa
insert into companies (id, name, slug, plan)
values (gen_random_uuid(), 'Barbearia Central', 'barbearia-central', 'pro');

-- Após criar um usuário no Supabase Auth, vincule ao perfil e à empresa
-- Substitua {USER_ID} e {COMPANY_ID}
-- update profiles set role = 'company_admin' where id = '{USER_ID}';
-- insert into company_users (company_id, user_id, role)
-- values ('{COMPANY_ID}', '{USER_ID}', 'company_admin');

-- Exemplos de serviços e unidades
-- insert into units (company_id, name, city)
-- values ('{COMPANY_ID}', 'Unidade Centro', 'São Paulo');
--
-- insert into services (company_id, name, price_cents, duration_minutes)
-- values ('{COMPANY_ID}', 'Corte masculino', 6000, 45);
