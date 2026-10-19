import Link from "next/link";
import { keluar } from "@/app/admin/actions";

export default function NavAdmin() {
  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-garis pb-3 text-sm">
      <Link href="/admin" className="py-2 font-semibold hover:text-utama">
        Produk
      </Link>
      <Link href="/admin/password" className="py-2 font-semibold hover:text-utama">
        Ganti password
      </Link>
      <form action={keluar} className="ml-auto">
        <button type="submit" className="py-2 text-teks-lembut hover:text-bahaya">
          Keluar
        </button>
      </form>
    </nav>
  );
}
