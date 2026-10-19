import { toko } from "@/lib/toko";

// US-13: manifest PWA supaya katalog bisa dipasang di layar HP seperti aplikasi.
// Warna di sini harus sama dengan token `utama` dan `latar` di app/globals.css
// (manifest tidak bisa membaca token CSS).
export default function manifest() {
  return {
    name: toko.nama,
    short_name: toko.nama,
    description: toko.tagline,
    lang: "id",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#1f6b4f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
