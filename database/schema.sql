-- Suggested Supabase schema. Review and run in a test project first.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.user_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.uploaded_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);
create table if not exists public.generated_assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_type text not null,
  storage_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.user_preferences enable row level security;
alter table public.user_memories enable row level security;
alter table public.uploaded_files enable row level security;
alter table public.generated_assets enable row level security;
alter table public.usage_logs enable row level security;
alter table public.user_settings enable row level security;
create policy "profile own row" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "conversations own rows" on public.conversations for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "messages own rows" on public.messages for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "preferences own row" on public.user_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "memories own rows" on public.user_memories for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "files own rows" on public.uploaded_files for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "assets own rows" on public.generated_assets for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "usage own rows" on public.usage_logs for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "settings own row" on public.user_settings for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create index if not exists conversations_user_updated_idx on public.conversations(user_id,updated_at desc);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id,created_at);
create index if not exists memories_user_created_idx on public.user_memories(user_id,created_at desc);
