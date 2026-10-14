# Konfigurasi Cloudflare Workers dan SMTP Gmail

Target: Worker `kerja-gimana`, repository `mfajar2123/kerja-gimana`, branch produksi `master`. Panduan ini mengikuti dashboard yang dibagikan pengguna pada 14 Oktober 2026. Cloudflare Pages memakai alur/preset berbeda; jangan mencampur `cloudflare_pages` dengan deploy Workers.

## Repository dan build

Commit konfigurasi proyek dan lockfile ke repository, lalu push ke `master`. Jangan ikutkan `.env`, `.dev.vars`, `.demo-data.local.json`, `.output`, `.wrangler`, atau artifacts.

| Field Workers Builds | Isi |
| --- | --- |
| Production branch | `master` |
| Root directory | `/`, bila package.json berada di root repository |
| Build command | `pnpm build:cloudflare` |
| Deploy command | `npx wrangler deploy` (memakai Wrangler lokal yang dipin) |
| API token | Pilih **Create new token** bila dashboard memperingatkan token lama sudah dihapus/dicabut |

Build variables, bila perlu dipatok lewat dashboard: `NODE_VERSION=22.23.3`, `PNPM_VERSION=12.6.0`, `NODE_OPTIONS=--max-old-space-size=4096`. File `.nvmrc` dan field packageManager juga menyimpan versi tersebut. Jangan menaruh password SMTP atau secret aplikasi di build variables.

`build:cloudflare` memilih preset `cloudflare_module`. `wrangler.jsonc` menyimpan nama Worker dan compatibility date. Nitro menghasilkan `.output/server/wrangler.json` berisi main dan binding aset yang benar, lalu `.wrangler/deploy/config.json` mengarahkan Wrangler ke file itu. File hasil build tersebut tidak perlu dicommit. `keep_vars: true` mempertahankan variabel runtime yang diatur melalui dashboard. Tidak ada config `env.production` tambahan; lingkungan Production di dashboard cukup untuk deploy ini.

### Jika deploy gagal dengan `node: Exec format error`

Paket `node-win-x64` sebelumnya menyediakan executable Windows melalui `node_modules/.bin/node`. Shim Wrangler mendahulukan executable tersebut, sehingga deploy di Linux gagal sebelum Wrangler berjalan. Paket itu telah dihapus dari manifest dan lockfile. Node harus diinstal melalui build image atau pengelola versi pada mesin lokal, bukan sebagai dependency aplikasi.

1. Commit dan push `package.json` serta `pnpm-lock.yaml` yang sudah diperbaiki ke `master`.
2. Pastikan build command `pnpm build:cloudflare`, deploy command `npx wrangler deploy`, dan build variable `NODE_VERSION=22.23.3`.
3. Buka **Settings → Builds → Build cache → Clear cache** untuk membuang dependency lama, lalu jalankan build ulang dari commit terbaru. Mengulang deployment commit lama tidak menyertakan perbaikan ini.

Versi Node didukung melalui `.nvmrc` dan `NODE_VERSION` sesuai [build image Cloudflare](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/). Pembersihan cache mengikuti [panduan build cache](https://developers.cloudflare.com/workers/ci-cd/builds/build-caching/). Perubahan ini tidak memerlukan paket berbayar atau aktivasi billing.

Verifikasi setelah perbaikan: manifest dan lockfile tidak lagi memuat `node-win-x64`, executable `node`/`node.exe` tidak ada di `node_modules/.bin`, Wrangler melaporkan versi 4.150.0, dan deploy dry-run kembali lulus (1670.91 KiB / gzip 390.68 KiB, binding `ASSETS`). Pemeriksaan ini dijalankan di Windows memakai Node 22.23.3 dari luar dependency aplikasi; build Linux Cloudflare perlu dijalankan ulang untuk memverifikasi lingkungan deployment sebenarnya.

## Runtime variables and secrets → Production

Masukkan di **Runtime variables and secrets**, bukan hanya di **Builds → Variables and secrets**. Variabel build tidak otomatis tersedia ketika request pengguna dilayani.

| Nama | Jenis | Nilai |
| --- | --- | --- |
| `NUXT_SUPABASE_URL` | Text | URL proyek Supabase |
| `NUXT_SUPABASE_PUBLISHABLE_KEY` | Text | Publishable key proyek yang sama |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | Secret | Kunci server pengganti yang disimpan privat; rotasi nilai yang pernah dibagikan |
| `NUXT_RATE_LIMIT_SECRET` | Secret | Nilai acak privat minimal 32 karakter; tersedia pada konfigurasi lokal |
| `NUXT_SITE_URL` | Text | Origin HTTPS aktual dari Domains, tanpa `/` terakhir |
| `NUXT_PUBLIC_SITE_URL` | Text | Sama persis dengan `NUXT_SITE_URL` |
| `NUXT_PUBLIC_DEMO_DATA_ENABLED` | Text | `false` untuk konfigurasi peluncuran publik; ini tidak menghapus data DEMO |

Contoh bentuk origin: `https://kerja-gimana.<subdomain-akun>.workers.dev`. Ganti placeholder dengan alamat yang benar dari dashboard; jangan menebak alamat akun. Supabase diakses melalui HTTPS, jadi tidak membutuhkan binding D1/R2/KV. Binding `ASSETS` dibuat oleh konfigurasi Nitro saat deploy.

Biarkan cache HTML privat tetap mengikuti `private, no-store`; jangan memasang Cache Everything pada halaman dengan sesi akun. Jangan memakai kredensial produksi untuk preview PR yang belum dipercaya. Tetap gunakan paket Free, tanpa mengaktifkan Workers Paid atau layanan tambahan.

## Supabase Auth URL

Di **Authentication → URL Configuration**:

- Site URL = origin HTTPS Worker yang sama.
- Redirect URLs = `<origin>/api/auth/callback` dan `<origin>/api/auth/callback?next=%2Flupa-password%3Fmode%3Dreset` untuk callback pemulihan proyek ini. Pertahankan redirect localhost yang masih dipakai untuk QA lokal. Bila dashboard memerlukan pola untuk query callback, batasi wildcard pada path callback origin yang sama, bukan semua subdomain.

Sesudah perubahan, uji registrasi/verifikasi email, login, logout, akun biasa ditolak dari admin, pemulihan password, form kontribusi, moderasi, dan header/cookie pada domain Worker. Build/dry-run lokal belum menguji kuota CPU atau TLS/cache pada Cloudflare yang sebenarnya.

## SMTP Gmail — di dashboard Supabase

Pengiriman email verifikasi dan reset password sudah melalui Supabase Auth (`signUp` dan `resetPasswordForEmail`). Proyek Nuxt ini tidak membutuhkan variabel `SMTP_HOST`, `SMTP_USER`, atau `SMTP_PASSWORD`. Tidak ada pengiriman SMTP langsung dari Worker. Form kontak disimpan dalam antrean moderator; pengaturan SMTP Auth tidak otomatis mengirim notifikasi kontak.

1. Pada akun Google pengirim, aktifkan **2-Step Verification**.
2. Buka [App Passwords](https://myaccount.google.com/apppasswords), buat app password khusus Supabase. Jika opsi tidak tersedia, periksa pembatasan akun sesuai dokumentasi Google.
3. Buka proyek Supabase → **Authentication → Emails → SMTP Settings** (pada sebagian tampilan: Authentication settings → SMTP) dan aktifkan custom SMTP.
4. Isi:

| Field | Nilai |
| --- | --- |
| Sender email | Alamat Gmail pengirim yang kamu kendalikan |
| Sender name | `KerjaGimana` |
| Host | `smtp.gmail.com` |
| Port | `587` (TLS/STARTTLS) |
| Username | Alamat Gmail yang sama, lengkap dengan `@gmail.com` |
| Password | App password Google khusus aplikasi, bukan password login Google |

Simpan app password hanya di Supabase. Jangan kirim melalui chat atau memasukkannya ke repository/Cloudflare. Tetap aktifkan konfirmasi email dan uji kiriman ke inbox nyata sebelum membuka pendaftaran publik. Periksa Rate Limits Supabase serta pembatasan Gmail; custom SMTP tidak berarti pengiriman tanpa batas. Gmail dapat dipakai untuk pengujian/beta bervolume kecil, tetapi keterkiriman dan pembatasannya harus dievaluasi sebelum peluncuran yang lebih luas. Bila password Google diganti, app password dapat dicabut sehingga konfigurasi SMTP perlu diperbarui.

## Hasil verifikasi lokal — 14 Oktober 2026

`pnpm build:cloudflare` berhasil memakai Nitro cloudflare-module dalam 1m 28s. `pnpm exec wrangler deploy --dry-run --outdir artifacts/cloudflare-dry-run` berhasil tanpa upload: 1670.91 KiB total / 390.68 KiB gzip, nama `kerja-gimana`, entry `index.mjs`, dan binding `ASSETS`. Typecheck dan lint lulus. Pemindaian 121 aset publik tidak menemukan nilai secret server/rate-limit yang dikonfigurasi.

Emulator runtime Windows belum dapat diuji: workerd 1.20261006.1 berhenti dengan access violation / stack overflow. Worker minimal yang hanya mengembalikan Response juga gagal dengan binary yang sama, sehingga kegagalan ini tidak mengisolasi bug aplikasi. Tidak ada login live, pengiriman email, atau deployment Cloudflare yang dilakukan dalam pengujian tersebut. Perlu smoke test domain Cloudflare setelah token dan runtime variables terpasang. Jangan menganggap dry-run sebagai bukti CPU Free tier atau keterkiriman SMTP.

## Rujukan resmi

- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) — token deploy dan perbedaan build/runtime variables.
- [Stale build token troubleshooting](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/) — membuat dan memilih token pengganti.
- [Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare) — preset, Wrangler, dan runtime config; detail output juga dicocokkan dengan Nitro 2.13.4 yang terpasang.
- [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp) — lokasi konfigurasi pengiriman Auth.
- [Google app passwords](https://support.google.com/accounts/answer/185833) dan [SMTP Gmail](https://developers.google.com/workspace/gmail/imap/imap-smtp) — 2FA, app password, host, serta port.
