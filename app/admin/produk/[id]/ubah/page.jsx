import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { pastikanAdmin } from "@/lib/supabase/auth";

// US-09: ubah produk. Form terisi data lama dari database, disimpan oleh Server Action ubahProduk.
export default async function HalamanUbahProduk({ params, searchParams }) {
  const { id } = await params;
  const { galat } = await searchParams;

  // id di tabel produk berupa angka; selain itu pasti tidak ada.
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const { supabase } = await pastikanAdmin();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("id, nama, harga, deskripsi, foto_url, kategori")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Data produk gagal dimuat.");
  }
  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormProduk
        produk={produk}
        action={ubahProduk.bind(null, produk.id)}
        galat={galat}
        labelTombol="Simpan perubahan"
      />
    </div>
  );
}