-- =====================================================================
--  TimeOut-kalender – opsætning af database og billeder i Supabase
--  Kopiér HELE filen ind i Supabase → SQL Editor → New query → Run.
--  Det er sikkert at køre den flere gange.
-- =====================================================================

-- 1) Tabellen med begivenheder
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default 'andet',
  description text,
  start_date  date not null,
  start_time  text,                       -- 'HH:MM' (tom = hele dagen)
  end_time    text,
  repeat      jsonb,                      -- gentagelse (tom = kun én dato)
  until       date,                       -- sidste dato for gentagelser
  image       text,                       -- sti til billede i "billeder"
  exceptions  jsonb not null default '{}'::jsonb,  -- aflysninger / "kun denne dag"
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2) Adgang: alle (også TV'et) må LÆSE – kun indloggede må rette
alter table public.events enable row level security;

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

drop policy if exists "Alle kan se kalenderen" on public.events;
create policy "Alle kan se kalenderen" on public.events
  for select to anon, authenticated using (true);

drop policy if exists "Redaktører kan oprette" on public.events;
create policy "Redaktører kan oprette" on public.events
  for insert to authenticated with check (true);

drop policy if exists "Redaktører kan rette" on public.events;
create policy "Redaktører kan rette" on public.events
  for update to authenticated using (true) with check (true);

drop policy if exists "Redaktører kan slette" on public.events;
create policy "Redaktører kan slette" on public.events
  for delete to authenticated using (true);

-- 3) Billeder: en offentlig "spand" (alle kan se billederne, kun indloggede kan uploade)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('billeder', 'billeder', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true;

drop policy if exists "Redaktører kan se billeder" on storage.objects;
create policy "Redaktører kan se billeder" on storage.objects
  for select to authenticated using (bucket_id = 'billeder');

drop policy if exists "Redaktører kan uploade billeder" on storage.objects;
create policy "Redaktører kan uploade billeder" on storage.objects
  for insert to authenticated with check (bucket_id = 'billeder');

drop policy if exists "Redaktører kan rette billeder" on storage.objects;
create policy "Redaktører kan rette billeder" on storage.objects
  for update to authenticated using (bucket_id = 'billeder');

drop policy if exists "Redaktører kan slette billeder" on storage.objects;
create policy "Redaktører kan slette billeder" on storage.objects
  for delete to authenticated using (bucket_id = 'billeder');
