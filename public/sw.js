// US-13: service worker minimal agar katalog bisa dipasang sebagai aplikasi (PWA).
// Sengaja TIDAK menyimpan cache: data produk dan halaman admin selalu diambil dari jaringan,
// jadi tidak ada risiko menampilkan data lama. Saat offline, halaman menampilkan pesan singkat.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(
      () =>
        new Response(
          '<!doctype html><html lang="id"><meta charset="utf-8">' +
            '<meta name="viewport" content="width=device-width,initial-scale=1">' +
            "<title>Tidak ada koneksi</title>" +
            '<body style="font-family:system-ui,sans-serif;padding:2rem;text-align:center">' +
            "<h1>Tidak ada koneksi internet</h1>" +
            "<p>Sambungkan ke internet lalu muat ulang halaman ini.</p></body></html>",
          { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
        )
    )
  );
});
