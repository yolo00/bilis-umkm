import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import TombolHapus from "@/components/TombolHapus";

const PESAN_KOSONG = 'Belum ada produk. Klik "Tambah produk" untuk menambahkan.';

// Tampilan HP (di bawah md): daftar kartu. Tampilan layar lebar: tabel.
export default function TabelProduk({ daftarProduk }) {
  return (
    <>
      <ul className="flex flex-col gap-3 md:hidden">
        {daftarProduk.length === 0 && (
          <li className="rounded-2xl border border-garis px-4 py-6 text-center text-sm text-teks-lembut">
            {PESAN_KOSONG}
          </li>
        )}
        {daftarProduk.map((produk) => (
          <li key={produk.id} className="flex flex-col gap-3 rounded-2xl border border-garis p-4">
            <div className="flex items-center gap-3">
              <img src={produk.foto_url} alt="" className="h-14 w-14 rounded-md object-cover" />
              <div className="min-w-0">
                <p className="font-semibold leading-snug">{produk.nama}</p>
                <p className="text-sm text-teks-lembut">{produk.kategori}</p>
                <p className="text-sm font-bold">{formatRupiah(produk.harga)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis" className="flex-1">
                Ubah
              </Tombol>
              <TombolHapus id={produk.id} nama={produk.nama} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-2xl border border-garis md:block">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-permukaan text-teks-lembut">
            <tr>
              <th className="px-4 py-3 font-semibold">Produk</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Harga</th>
              <th className="px-4 py-3 font-semibold">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {daftarProduk.length === 0 && (
              <tr className="border-t border-garis">
                <td colSpan={4} className="px-4 py-6 text-center text-teks-lembut">
                  {PESAN_KOSONG}
                </td>
              </tr>
            )}
            {daftarProduk.map((produk) => (
              <tr key={produk.id} className="border-t border-garis">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={produk.foto_url} alt="" className="h-10 w-10 rounded-md object-cover" />
                    <span className="font-semibold">{produk.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-teks-lembut">{produk.kategori}</td>
                <td className="px-4 py-3">{formatRupiah(produk.harga)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis">
                      Ubah
                    </Tombol>
                    <TombolHapus id={produk.id} nama={produk.nama} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
