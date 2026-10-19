"use client";

import { useState } from "react";
import { buatDeskripsiAI } from "@/app/admin/actions";
import Tombol from "@/components/Tombol";

// US-14: tombol pembuat deskripsi dengan AI. Membaca nama dan kategori dari form,
// meminta deskripsi ke Server Action buatDeskripsiAI, lalu mengisinya ke kolom Deskripsi.
// Tidak ada kunci API atau akses Supabase di sini.
export default function TombolDeskripsiAI() {
  const [memproses, setMemproses] = useState(false);
  const [pesan, setPesan] = useState("");

  async function buat(event) {
    const form = event.currentTarget.form;
    setMemproses(true);
    setPesan("");
    const hasil = await buatDeskripsiAI(form.elements.nama.value, form.elements.kategori.value);
    setMemproses(false);

    if (hasil.deskripsi) {
      form.elements.deskripsi.value = hasil.deskripsi;
      setPesan("Deskripsi dibuat. Periksa dan ubah dulu sebelum disimpan.");
    } else {
      setPesan(hasil.galat);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Tombol type="button" varian="garis" className="self-start" onClick={buat} disabled={memproses}>
        {memproses ? "Membuat deskripsi..." : "Buat deskripsi dengan AI"}
      </Tombol>
      {pesan && (
        <p role="status" className="text-sm text-teks-lembut">
          {pesan}
        </p>
      )}
    </div>
  );
}
