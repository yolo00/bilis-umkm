"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

const JUMLAH_MAKS = 99;

// US-03 dan US-12: membuka WhatsApp toko dengan pesan otomatis berisi nama, jumlah, dan harga produk.
// Tidak ada akses Supabase di sini; data produk dikirim dari halaman detail (server).
export default function TombolWhatsApp({ produk }) {
  // Disimpan sebagai teks supaya kolom jumlah bisa dikosongkan saat mengetik.
  const [isian, setIsian] = useState("1");

  const angka = parseInt(isian, 10);
  const jumlah = Number.isFinite(angka) ? Math.min(Math.max(angka, 1), JUMLAH_MAKS) : 1;
  const total = produk.harga * jumlah;

  function ubahJumlah(selisih) {
    setIsian(String(Math.min(Math.max(jumlah + selisih, 1), JUMLAH_MAKS)));
  }

  // wa.me butuh format internasional tanpa tanda + atau spasi: "+62 813 7207 9904" -> "6281372079904"
  const nomor = toko.nomorWhatsApp.replace(/\D/g, "");
  const pesan = `Halo, saya ingin memesan ${produk.nama} sebanyak ${jumlah} (${formatRupiah(produk.harga)} per item), total ${formatRupiah(total)}.`;
  const href = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  const kelasTombolJumlah =
    "flex h-11 w-11 items-center justify-center text-lg font-semibold text-teks hover:bg-permukaan disabled:text-teks-lembut disabled:opacity-50";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="jumlah-pesanan" className="text-sm font-semibold">
          Jumlah
        </label>
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-garis">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            disabled={jumlah <= 1}
            onClick={() => ubahJumlah(-1)}
            className={kelasTombolJumlah}
          >
            −
          </button>
          <input
            id="jumlah-pesanan"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={isian}
            onChange={(event) => setIsian(event.target.value.replace(/\D/g, "").slice(0, 2))}
            onBlur={() => setIsian(String(jumlah))}
            className="h-11 w-14 border-x border-garis bg-latar text-center text-base font-semibold text-teks focus:outline-none"
          />
          <button
            type="button"
            aria-label="Tambah jumlah"
            disabled={jumlah >= JUMLAH_MAKS}
            onClick={() => ubahJumlah(1)}
            className={kelasTombolJumlah}
          >
            +
          </button>
        </div>
        <p className="text-sm text-teks-lembut">
          Total <span className="font-bold text-teks">{formatRupiah(total)}</span>
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
