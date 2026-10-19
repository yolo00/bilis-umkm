import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";

// US-08: tambah produk. Disimpan ke database oleh Server Action tambahProduk.
export default async function HalamanTambahProduk({ searchParams }) {
  const { galat } = await searchParams;

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Tambah produk</h1>
      <FormProduk action={tambahProduk} galat={galat} labelTombol="Simpan produk" />
    </div>
  );
}