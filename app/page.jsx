import KatalogProduk from "@/components/KatalogProduk";
import { toko } from "@/lib/toko";
import { createServerClient } from "@/lib/supabase/server";

export default async function HalamanKatalog() {
  const supabase = createServerClient();
  const { data: daftarProduk, error } = await supabase
    .from("produk")
    .select("id, nama, harga, foto_url, kategori")
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        {error ? (
          <>
            <h2 id="judul-produk" className="text-xl font-bold">
              Produk kami
            </h2>
            <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Gagal memuat produk: {error.message}
            </p>
          </>
        ) : (
          // US-11: data diambil di server, penyaringan kategori dilakukan di KatalogProduk.
          <KatalogProduk daftarProduk={daftarProduk} />
        )}
      </section>
    </>
  );
}
