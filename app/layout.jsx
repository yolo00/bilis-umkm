import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DaftarkanSW from "@/components/DaftarkanSW";
import { toko } from "@/lib/toko";

export const metadata = {
  title: toko.nama,
  description: toko.tagline,
  applicationName: toko.nama,
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    title: toko.nama,
    statusBarStyle: "default",
  },
};

// US-13: tampilan mobile. themeColor sama dengan token `utama` di app/globals.css.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1f6b4f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
        <Footer />
        <DaftarkanSW />
      </body>
    </html>
  );
}
