"use client";

import { hapusProduk } from "@/app/admin/actions";
import Tombol from "@/components/Tombol";

// US-10: tombol hapus dengan peringatan konfirmasi sebelum produk dihapus dari database.
// Tidak ada akses Supabase di sini; penghapusan diproses Server Action hapusProduk.
export default function TombolHapus({ id, nama }) {
  return (
    <form
      action={hapusProduk}
      onSubmit={(event) => {
        const lanjut = window.confirm(
          `Hapus produk "${nama}"?\n\nProduk akan dihapus permanen dari database dan tidak bisa dikembalikan.`
        );
        if (!lanjut) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Tombol type="submit" varian="bahaya">
        Hapus
      </Tombol>
    </form>
  );
}