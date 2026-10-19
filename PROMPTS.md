# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
File baru: lib.supabase/server.js
File diubah: app/page.jsx

**Perbaikan:**


## US-02 Detail produk

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
File diubah: app/page.jsx

**Perbaikan:**


## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
File diubah: components/TombolWhatsApp.jsx

**Perbaikan:**


## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

Kirim hasil perubahan file disini.

**Hasil:**
File baru: app/admin/actions.js, lib/supabase/auth.js
File diubah: app/admin/login/page.jsx, components/NavAdmin.jsx

**Perbaikan:**
[SENDIRI] 
Kesalahan penamaan file admin.js > action.js

**[SENDIRI]** 
Autentikasi admin memiliki urutan eksekusi yang salah. Menekan "Masuk sebagai admin" langsung membawa ke halaman edit, dan keluar/logout baru membuka form login.
Perbaiki dengan membuat "Masuk sebagai admin: membuka halaman login, dan tombol keluar langsung kembali kehalaman utama.

Kirim hasil perubahan file disini.
File diubah: pp/admin/actions.js, components/Footer.jsx

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

Kirim hasil perubahan file disini.


**Hasil:**
File diubah: app/admin/actions.js, app/admin/password/page.jsx

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

Kirim hasil perubahan file disini.
**Hasil:**
File baru: proxy.js
File diubah: app/admin/page.jsx

**Perbaikan:**

## US-07 

**Prompt:**
US-07, 08, 09, 10. Admin dapat melihat isi produk sesuai database, dan menambahkan produk baru, mengubah data produk, dan menghapus data produk dari database.

Perbarui halaman app/admin/page.jsx dan file terkait agar admin dapat melakukan CRUD terhadap isi database. Penghapusan data harus ada peringatan untuk konfirmasi hapus data. Setiap kali proses CRUD berlangsung, page utama langsung refresh dan menampilkan data terbaru.

**Hasil:**
app/admin/page.jsx
components/TabelProduk.jsx
components/FormProduk.jsx
components/TombolHapus.jsx
app/admin/actions.js
app/admin/produk/baru/page.jsx
app/admin/produk/[id]/ubah/page.jsx

**Perbaikan:**


## US-11 

**Prompt:**

**Hasil:**

**Perbaikan:**


## US-12 

**Prompt:**

**Hasil:**

**Perbaikan:**


## US-13 

**Prompt:**

**Hasil:**

**Perbaikan:**


## US-14 

**Prompt:**

**Hasil:**

**Perbaikan:**