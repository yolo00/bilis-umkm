import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Koneksi Supabase untuk Auth di sisi server (Server Component, Server Action, Route Handler).
 * Memakai SUPABASE_PUBLISHABLE_KEY dan menyimpan sesi login di cookie.
 * Jangan gunakan di file yang memakai "use client".
 */
export async function buatKlienAuth() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY harus diisi di environment variable."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesUntukDisimpan) {
        try {
          cookiesUntukDisimpan.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Dipanggil dari Server Component yang tidak boleh menulis cookie: abaikan.
          // Cookie ditulis saat dipanggil dari Server Action atau Route Handler.
        }
      },
    },
  });
}