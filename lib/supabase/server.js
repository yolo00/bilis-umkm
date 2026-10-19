import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase untuk sisi server (Server Component, Server Action, Route Handler).
 * Memakai SUPABASE_SECRET_KEY supaya bisa melewati RLS untuk membaca data publik.
 * Jangan gunakan di file yang memakai "use client".
 */
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diisi di environment variable."
    );
  }

  return createClient(url, key);
}
