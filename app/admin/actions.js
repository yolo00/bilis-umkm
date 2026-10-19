"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

// ---------- Kelola produk (US-08, US-09, US-10) ----------

// Membaca dan memvalidasi isi form produk di server. Mengembalikan { data } atau { galat }.
function bacaFormProduk(formData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const harga = String(formData.get("harga") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const fotoUrl = String(formData.get("foto_url") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();

  if (!nama || nama.length > 200) return { galat: "nama" };
  if (!/^\d+$/.test(harga) || Number(harga) > 2147483647) return { galat: "harga" };
  // Link foto boleh kosong; kalau diisi harus http(s) atau path lokal seperti /produk/kopi.svg.
  if (fotoUrl && !/^(https?:\/\/\S+|\/(?!\/)\S*)$/.test(fotoUrl)) return { galat: "foto" };

  return {
    data: {
      nama,
      harga: Number(harga),
      kategori: kategori || null,
      foto_url: fotoUrl || null,
      deskripsi: deskripsi || null,
    },
  };
}

// Muat ulang halaman yang menampilkan produk supaya data terbaru langsung tampil.
function segarkanHalamanProduk() {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/produk/[id]", "page");
}

// US-08: tambah produk.
export async function tambahProduk(formData) {
  const { supabase } = await pastikanAdmin();

  const hasil = bacaFormProduk(formData);
  if (hasil.galat) redirect(`/admin/produk/baru?galat=${hasil.galat}`);

  const { error } = await supabase.from("produk").insert(hasil.data);
  if (error) redirect("/admin/produk/baru?galat=gangguan");

  segarkanHalamanProduk();
  redirect("/admin?status=ditambah");
}

// US-09: ubah produk. Dipasang ke form dengan ubahProduk.bind(null, id).
export async function ubahProduk(id, formData) {
  const { supabase } = await pastikanAdmin();

  const idProduk = String(id);
  if (!/^\d+$/.test(idProduk)) redirect("/admin");

  const hasil = bacaFormProduk(formData);
  if (hasil.galat) redirect(`/admin/produk/${idProduk}/ubah?galat=${hasil.galat}`);

  const { error } = await supabase.from("produk").update(hasil.data).eq("id", idProduk);
  if (error) redirect(`/admin/produk/${idProduk}/ubah?galat=gangguan`);

  segarkanHalamanProduk();
  redirect("/admin?status=diubah");
}

// US-10: hapus produk. Konfirmasi ditampilkan di browser oleh components/TombolHapus.jsx.
export async function hapusProduk(formData) {
  const { supabase } = await pastikanAdmin();

  const idProduk = String(formData.get("id") ?? "");
  if (!/^\d+$/.test(idProduk)) redirect("/admin?galat=hapus");

  const { error } = await supabase.from("produk").delete().eq("id", idProduk);
  if (error) redirect("/admin?galat=hapus");

  segarkanHalamanProduk();
  redirect("/admin?status=dihapus");
}
// US-14: buat deskripsi produk dengan AI (Gemini API) dari nama dan kategori.
// Kunci API dibaca dari GEMINI_API_KEY (hanya di server, tanpa awalan NEXT_PUBLIC_).
export async function buatDeskripsiAI(nama, kategori) {
  // Aturan keamanan #3: hanya admin yang sudah login yang boleh memakai fitur ini.
  await pastikanAdmin();

  const namaProduk = String(nama ?? "").trim().slice(0, 200);
  const kategoriProduk = String(kategori ?? "").trim().slice(0, 100);
  if (!namaProduk) return { galat: "Isi nama produk dulu, lalu buat deskripsinya." };

  const kunci = process.env.GEMINI_API_KEY;
  if (!kunci) {
    return { galat: "Fitur AI belum aktif. Isi GEMINI_API_KEY di environment variable lalu jalankan ulang aplikasi." };
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const perintah =
    `Tulis deskripsi singkat untuk produk UMKM dalam bahasa Indonesia, 2 sampai 3 kalimat (maksimal 50 kata), ` +
    `ramah dan menarik untuk pembeli. Jangan mengarang fakta yang tidak ada (bahan, ukuran, harga, klaim kesehatan). ` +
    `Tulis teks biasa tanpa tanda bintang, judul, atau daftar.\n` +
    `Nama produk: ${namaProduk}\nKategori: ${kategoriProduk || "(tidak disebutkan)"}`;

  try {
    const respons = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": kunci },
        body: JSON.stringify({ contents: [{ parts: [{ text: perintah }] }] }),
        signal: AbortSignal.timeout(20000),
        cache: "no-store",
      }
    );
    if (!respons.ok) {
      return { galat: "Gagal membuat deskripsi (layanan AI menolak permintaan). Periksa GEMINI_API_KEY lalu coba lagi." };
    }
    const hasil = await respons.json();
    const teks = hasil?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!teks) return { galat: "AI tidak mengembalikan deskripsi. Coba lagi." };
    return { deskripsi: teks.replace(/[*#]/g, "").trim() };
  } catch {
    return { galat: "Gagal menghubungi layanan AI. Periksa koneksi internet lalu coba lagi." };
  }
}
