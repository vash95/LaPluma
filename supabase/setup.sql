-- Ejecutar en el editor SQL del proyecto Supabase.
create table if not exists public.lapluma_content (
  id integer primary key check (id = 1),
  document jsonb,
  revision integer not null default 0 check (revision >= 0)
);
alter table public.lapluma_content enable row level security;
revoke all on public.lapluma_content from anon, authenticated;
grant select, insert, update on public.lapluma_content to service_role;
insert into public.lapluma_content (id, document, revision) values (1, null, 0)
on conflict (id) do nothing;

-- Bucket privado: el servidor comprueba la visibilidad antes de mostrar fotos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lapluma-images', 'lapluma-images', false, 4000000, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false, file_size_limit=4000000,
allowed_mime_types=array['image/jpeg','image/png','image/webp'];
