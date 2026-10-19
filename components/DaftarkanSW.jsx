"use client";

import { useEffect } from "react";

// US-13: mendaftarkan service worker (public/sw.js). Hanya aktif di versi produksi.
export default function DaftarkanSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Gagal mendaftar tidak mengganggu pemakaian situs.
    });
  }, []);

  return null;
}
