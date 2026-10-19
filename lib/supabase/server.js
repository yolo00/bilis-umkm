import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase untuk sisi server.
 * Hanya boleh digunakan di Server Component, Server Action,
 * atau Route Handler. Jangan gunakan di Client Component.
 */
export function createServerClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !key) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diisi di environment variable."
    );
  }

  // Hapus spasi yang tidak sengaja ditambahkan.
  const url = rawUrl.trim().replace(/\/+$/, "");

  // Validasi format URL.
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "SUPABASE_URL tidak valid. Gunakan URL utama proyek Supabase."
    );
  }

  if (
    parsedUrl.protocol !== "https:" ||
    !parsedUrl.hostname.endsWith(".supabase.co") ||
    parsedUrl.pathname !== ""
  ) {
    throw new Error(
      "SUPABASE_URL harus berupa URL utama proyek, contohnya https://project-id.supabase.co"
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}