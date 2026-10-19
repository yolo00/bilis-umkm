"use server";

import { redirect } from "next/navigation";
import { buatKlienAuth, pastikanAdmin } from "@/lib/supabase/auth";

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

// US-05: ganti password admin yang sedang login, divalidasi dan diproses di server.
export async function gantiPassword(formData) {
  // Aturan keamanan #3: periksa login di server sebelum mengubah data.
  const { supabase } = await pastikanAdmin();

  const passwordBaru = String(formData.get("password_baru") ?? "");
  const konfirmasi = String(formData.get("konfirmasi_password") ?? "");

  if (passwordBaru.length < 8) {
    redirect("/admin/password?galat=pendek");
  }
  if (passwordBaru !== konfirmasi) {
    redirect("/admin/password?galat=beda");
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    let galat = "gangguan";
    if (error.code === "same_password") galat = "sama";
    else if (error.code === "weak_password") galat = "lemah";
    redirect(`/admin/password?galat=${galat}`);
  }

  redirect("/admin/password?status=berhasil");
}