"use server";

import { redirect } from "next/navigation";
import { buatKlienAuth } from "@/lib/supabase/auth";

// US-04: login admin memakai Supabase Auth (email dan password), diproses di server.
export async function masuk(formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/admin/login?galat=kosong");
  }

  const supabase = await buatKlienAuth();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // 400 = email/password salah; selain itu gangguan di sisi layanan atau jaringan.
    redirect(`/admin/login?galat=${error.status === 400 ? "kredensial" : "gangguan"}`);
  }

  redirect("/admin");
}

// US-04: mengakhiri sesi admin lalu kembali ke halaman utama.
export async function keluar() {
  const supabase = await buatKlienAuth();
  await supabase.auth.signOut();
  redirect("/");
}