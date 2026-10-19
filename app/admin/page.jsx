import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { pastikanAdmin } from "@/lib/supabase/auth";

const PESAN_STATUS = {
  ditambah: "Produk berhasil ditambahkan.",
  diubah: "Perubahan produk berhasil disimpan.",
  dihapus: "Produk berhasil dihapus.",
};

const PESAN_GALAT = {
  hapus: "Produk gagal dihapus. Coba lagi beberapa saat lagi.",
};

// US-06: halaman ini dilindungi oleh proxy.js dan dicek ulang oleh pastikanAdmin().
// US-07: daftar produk dibaca dari tabel "produk" di database, di sisi server.
export default async function HalamanAdmin({ searchParams }) {
  const { status, galat } = await searchParams;
  const { supabase } = await pastikanAdmin();

  const { data: daftarProduk, error } = await supabase
    .from("produk")
    .select("id, nama, harga, deskripsi, foto_url, kategori")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      {PESAN_STATUS[status] && (
        <p role="status" className="text-sm font-semibold text-utama">
          {PESAN_STATUS[status]}
        </p>
      )}
      {PESAN_GALAT[galat] && (
        <p role="alert" className="text-sm font-semibold text-bahaya">
          {PESAN_GALAT[galat]}
        </p>
      )}
      {error ? (
        <p role="alert" className="text-sm font-semibold text-bahaya">
          Data produk gagal dimuat. Muat ulang halaman atau coba lagi nanti.
        </p>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}