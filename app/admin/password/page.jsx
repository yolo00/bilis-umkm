import NavAdmin from "@/components/NavAdmin";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { gantiPassword } from "@/app/admin/actions";

const PESAN_GALAT = {
  pendek: "Password baru minimal 8 karakter.",
  beda: "Password baru dan konfirmasinya tidak sama.",
  sama: "Password baru tidak boleh sama dengan password lama.",
  lemah: "Password baru terlalu mudah ditebak. Gunakan kombinasi yang lebih kuat.",
  gangguan: "Password gagal diganti karena ada gangguan. Coba lagi beberapa saat lagi.",
};

export default async function HalamanGantiPassword({ searchParams }) {
  const { galat, status } = await searchParams;
  const pesanGalat = PESAN_GALAT[galat];

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ganti password</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Ganti password bawaan segera setelah pertama kali masuk. Minimal 8 karakter.
        </p>
      </div>
      <form action={gantiPassword} className="flex max-w-sm flex-col gap-4">
        {status === "berhasil" && (
          <p role="status" className="text-sm font-semibold text-utama">
            Password berhasil diganti.
          </p>
        )}
        {pesanGalat && (
          <p role="alert" className="text-sm font-semibold text-bahaya">
            {pesanGalat}
          </p>
        )}
        <Input
          label="Password baru"
          name="password_baru"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Input
          label="Ulangi password baru"
          name="konfirmasi_password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Tombol type="submit" className="self-start">
          Simpan password
        </Tombol>
      </form>
    </div>
  );
}