import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { masuk } from "@/app/admin/actions";

const PESAN_GALAT = {
  kosong: "Email dan password wajib diisi.",
  kredensial: "Email atau password salah. Periksa kembali lalu coba lagi.",
  gangguan: "Login gagal karena ada gangguan. Coba lagi beberapa saat lagi.",
};

export default async function HalamanLogin({ searchParams }) {
  const { galat } = await searchParams;
  const pesanGalat = PESAN_GALAT[galat];

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-12">
      <div>
        <h1 className="text-2xl font-extrabold">Masuk admin</h1>
        <p className="mt-1 text-sm text-teks-lembut">Khusus pemilik toko untuk mengelola produk.</p>
      </div>
      <form action={masuk} className="flex flex-col gap-4">
        {pesanGalat && (
          <p role="alert" className="text-sm font-semibold text-bahaya">
            {pesanGalat}
          </p>
        )}
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Tombol type="submit">Masuk</Tombol>
      </form>
    </div>
  );
}