"use client";

import { useEffect, useRef, useState } from "react";
import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";

// US-11: jumlah kategori yang tampil sebagai tombol; sisanya masuk ke dropdown.
const JUMLAH_TOMBOL_KATEGORI = 3;

function namaKategori(produk) {
  return (produk.kategori ?? "").trim();
}

// Kategori diurutkan dari yang paling banyak produknya (sama banyak: urut abjad).
function hitungKategori(daftarProduk) {
  const hitung = new Map();
  for (const produk of daftarProduk) {
    const nama = namaKategori(produk);
    if (nama) hitung.set(nama, (hitung.get(nama) ?? 0) + 1);
  }
  return [...hitung.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "id"))
    .map(([nama, jumlah]) => ({ nama, jumlah }));
}

// Data produk sudah diambil di server (app/page.jsx). Komponen ini hanya menyaring tampilan,
// jadi tidak ada akses Supabase dari sisi browser.
export default function KatalogProduk({ daftarProduk }) {
  const [dipilih, setDipilih] = useState([]);
  const [dropdownTerbuka, setDropdownTerbuka] = useState(false);
  const wadahFilter = useRef(null);

  const semuaKategori = hitungKategori(daftarProduk);
  const kategoriTombol = semuaKategori.slice(0, JUMLAH_TOMBOL_KATEGORI);
  const kategoriLain = semuaKategori.slice(JUMLAH_TOMBOL_KATEGORI);
  const jumlahLainDipilih = kategoriLain.filter((k) => dipilih.includes(k.nama)).length;

  // Pilih 2 kategori atau lebih: produk tampil jika cocok dengan salah satu kategori terpilih.
  const produkTampil =
    dipilih.length === 0
      ? daftarProduk
      : daftarProduk.filter((produk) => dipilih.includes(namaKategori(produk)));

  function ubahPilihan(nama) {
    setDipilih((sebelumnya) =>
      sebelumnya.includes(nama) ? sebelumnya.filter((k) => k !== nama) : [...sebelumnya, nama]
    );
  }

  // Tutup dropdown saat klik di luar atau menekan Escape.
  useEffect(() => {
    if (!dropdownTerbuka) return;
    function klikDiLuar(event) {
      if (wadahFilter.current && !wadahFilter.current.contains(event.target)) {
        setDropdownTerbuka(false);
      }
    }
    function tombolKeyboard(event) {
      if (event.key === "Escape") setDropdownTerbuka(false);
    }
    document.addEventListener("pointerdown", klikDiLuar);
    document.addEventListener("keydown", tombolKeyboard);
    return () => {
      document.removeEventListener("pointerdown", klikDiLuar);
      document.removeEventListener("keydown", tombolKeyboard);
    };
  }, [dropdownTerbuka]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>

        {semuaKategori.length > 0 && (
          <div
            ref={wadahFilter}
            role="group"
            aria-label="Filter kategori"
            className="relative flex flex-wrap items-center gap-2"
          >
            <Tombol
              type="button"
              varian={dipilih.length === 0 ? "utama" : "garis"}
              aria-pressed={dipilih.length === 0}
              onClick={() => setDipilih([])}
            >
              Semua
            </Tombol>

            {kategoriTombol.map((kategori) => {
              const aktif = dipilih.includes(kategori.nama);
              return (
                <Tombol
                  key={kategori.nama}
                  type="button"
                  varian={aktif ? "utama" : "garis"}
                  aria-pressed={aktif}
                  onClick={() => ubahPilihan(kategori.nama)}
                >
                  {kategori.nama}
                </Tombol>
              );
            })}

            {kategoriLain.length > 0 && (
              <>
                <Tombol
                  type="button"
                  varian={jumlahLainDipilih > 0 ? "utama" : "garis"}
                  aria-haspopup="true"
                  aria-expanded={dropdownTerbuka}
                  onClick={() => setDropdownTerbuka((terbuka) => !terbuka)}
                >
                  Kategori lain{jumlahLainDipilih > 0 ? ` (${jumlahLainDipilih})` : ""}
                  <span aria-hidden="true" className="ml-1.5 text-xs">
                    ▾
                  </span>
                </Tombol>

                {dropdownTerbuka && (
                  <div className="absolute right-0 top-full z-10 mt-2 max-h-72 w-60 max-w-full overflow-y-auto rounded-xl border border-garis bg-latar p-2 shadow-lg">
                    {kategoriLain.map((kategori) => (
                      <label
                        key={kategori.nama}
                        className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm hover:bg-permukaan"
                      >
                        <input
                          type="checkbox"
                          checked={dipilih.includes(kategori.nama)}
                          onChange={() => ubahPilihan(kategori.nama)}
                          className="h-4 w-4 accent-utama"
                        />
                        <span className="font-semibold">{kategori.nama}</span>
                        <span className="ml-auto text-xs text-teks-lembut">{kategori.jumlah}</span>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <p className="sr-only" role="status">
        Menampilkan {produkTampil.length} produk
      </p>

      {produkTampil.length === 0 ? (
        <p className="py-12 text-center text-teks-lembut">Belum ada produk.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {produkTampil.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </>
  );
}
