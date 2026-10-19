import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// US-06: semua halaman /admin (kecuali /admin/login) hanya untuk admin yang sudah login.
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Halaman login harus bisa dibuka tanpa login.
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  // Env belum diisi: tutup akses (fail closed), jangan biarkan terbuka.
  if (!url || !key) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesUntukDisimpan) {
        // Simpan cookie sesi yang diperbarui (refresh token) ke request dan response.
        cookiesUntukDisimpan.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesUntukDisimpan.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() memverifikasi token ke server Supabase (getSession() hanya membaca cookie).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};