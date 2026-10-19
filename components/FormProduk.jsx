import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import TombolDeskripsiAI from "@/components/TombolDeskripsiAI";

const PESAN_GALAT = {
  nama: "Nama produk wajib diisi (maksimal 200 karakter).",
  harga: "Harga harus berupa angka bulat, 0 atau lebih.",
  foto: "Link foto harus diawali https://, http://, atau / (contoh: /produk/kopi.svg).",
  gangguan: "Produk gagal disimpan karena ada gangguan. Coba lagi beberapa saat lagi.",
};

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09).
// Nama field sama dengan kolom tabel "produk". `action` adalah Server Action penyimpan,
// `galat` adalah kode error dari hasil validasi server.
export default function FormProduk({ produk = {}, labelTombol, action, galat }) {
  const pesanGalat = PESAN_GALAT[galat];

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      {pesanGalat && (
        <p role="alert" className="text-sm font-semibold text-bahaya">
          {pesanGalat}
        </p>
      )}
      <Input label="Nama produk" name="nama" defaultValue={produk.nama} required />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input label="Kategori" name="kategori" defaultValue={produk.kategori} />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input label="Deskripsi" name="deskripsi" textarea defaultValue={produk.deskripsi} />
      <TombolDeskripsiAI />
      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}