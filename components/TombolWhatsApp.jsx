import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

// US-03: membuka WhatsApp toko dengan pesan otomatis berisi nama dan harga produk.
export default function TombolWhatsApp({ produk }) {
  // wa.me butuh format internasional tanpa tanda + atau spasi: "+62 813 7207 9904" -> "6281372079904"
  const nomor = toko.nomorWhatsApp.replace(/\D/g, "");
  const pesan = `Halo, saya ingin memesan ${produk.nama} seharga ${formatRupiah(produk.harga)}.`;
  const href = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
    >
      Pesan via WhatsApp
    </a>
  );
}