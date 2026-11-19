# Tutorial Deploy BangAl Labs ke VPS

Tutorial ini menggunakan struktur berikut:

- Source di komputer lokal: `/Users/newuser/ali/project/bangAllabs/website`
- Source di VPS: `/opt/website`
- Aplikasi Next.js berjalan melalui Docker di `127.0.0.1:3100` (container tetap memakai port internal `3000`)
- Caddy yang sudah melayani `cv-abu-app` tetap menjadi reverse proxy tunggal di port 80/443
- Container BangAl Labs bergabung ke external Docker network `cv-abu-net`
- Domain utama: `bangallabs.web.id`

Ganti nilai berikut sesuai VPS Anda:

```text
<VPS_USER> = user SSH, misalnya ubuntu
<VPS_IP>   = IP publik VPS
```

## 1. Hubungkan domain ke VPS

Pada pengelola DNS domain, buat record berikut:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `<VPS_IP>` |
| A | `www` | `<VPS_IP>` |

Tunggu propagasi, kemudian cek dari komputer lokal:

```bash
dig +short bangallabs.web.id
dig +short www.bangallabs.web.id
```

Keduanya harus menampilkan IP VPS. Caddy baru dapat menerbitkan sertifikat HTTPS setelah domain mengarah ke VPS.

## 2. Siapkan VPS

Masuk melalui SSH:

```bash
ssh <VPS_USER>@<VPS_IP>
```

Untuk Ubuntu 22.04/24.04 baru, pasang kebutuhan dasar dan repository resmi Docker:

```bash
sudo apt update
sudo apt install -y ca-certificates curl rsync

sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

Jika VPS sudah memiliki Docker, periksa lebih dahulu dengan `docker --version` dan `docker compose version`. Jika keduanya berfungsi, Anda dapat melewati instalasi Docker di atas. Jangan mencampur paket `docker.io` bawaan Ubuntu dengan `docker-ce` dari repository resmi pada server yang sama.

Verifikasi instalasi:

```bash
sudo docker run --rm hello-world
docker compose version
```

Berikan user SSH akses menjalankan Docker tanpa `sudo`:

```bash
sudo usermod -aG docker <VPS_USER>
```

Keluar lalu login ulang agar keanggotaan grup aktif:

```bash
exit
ssh <VPS_USER>@<VPS_IP>
```

Siapkan folder deployment:

```bash
sudo mkdir -p /opt/website
sudo chown -R <VPS_USER>:<VPS_USER> /opt/website
```

## 3. Copy project dari komputer lokal

Jalankan perintah berikut di Terminal komputer lokal, bukan di dalam VPS:

```bash
cd /Users/newuser/ali/project/bangAllabs

rsync -avz \
  --exclude node_modules \
  --exclude .next \
  --exclude .env.local \
  --exclude .env.production \
  website/ <VPS_USER>@<VPS_IP>:/opt/website/
```

Perintah tersebut tidak menyalin dependency, hasil build lokal, atau secret environment.

Periksa hasil copy:

```bash
ssh <VPS_USER>@<VPS_IP>
cd /opt/website
ls -la
```

Pastikan minimal terdapat `Dockerfile`, `docker-compose.yml`, `package.json`, `app`, `components`, `lib`, dan `public`.

## 4. Buat konfigurasi production

Masih di VPS:

```bash
cd /opt/website
cp .env.example .env.production
nano .env.production
```

Isi dengan nilai sebenarnya:

```dotenv
NEXT_PUBLIC_SITE_URL=https://bangallabs.web.id
CONTACT_EMAIL=hello@bangallabs.web.id
WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Catatan:

- Nomor WhatsApp menggunakan `62`, tanpa tanda `+`, spasi, atau angka awal `0`.
- Kosongkan `NEXT_PUBLIC_GA_ID` jika GA4 belum dibuat.
- Pastikan mailbox `CONTACT_EMAIL` benar-benar aktif.
- Jangan mengirim atau menyimpan `.env.production` ke repository publik.

Simpan Nano dengan `Ctrl+O`, Enter, lalu keluar menggunakan `Ctrl+X`.

Batasi permission file environment:

```bash
chmod 600 /opt/website/.env.production
```

## 5. Build dan jalankan container

Di VPS:

```bash
cd /opt/website
docker compose --env-file .env.production config
docker compose --env-file .env.production up -d --build
```

Konfigurasi menetapkan `HOSTNAME=0.0.0.0` agar Next.js menerima koneksi dari loopback host dan container lain pada `cv-abu-net`. Port `3000` di sini adalah port internal milik container BangAl Labs sehingga tidak bertabrakan dengan port internal container CV Abu.

Periksa status dan log:

```bash
docker compose ps
docker compose logs --tail=100 web
```

Status container seharusnya `Up`. Tes langsung dari VPS:

```bash
curl -I http://127.0.0.1:3100
```

Hasil yang diharapkan adalah `HTTP/1.1 200 OK` atau respons sukses `2xx/3xx`.

## 6. Tambahkan BangAl Labs ke Caddy

Jangan mengganti atau menghapus konfigurasi `cv-abu-app`. Buat backup Caddyfile terlebih dahulu:

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.backup
sudo nano /etc/caddy/Caddyfile
```

Tambahkan blok berikut di bagian paling bawah:

```caddyfile
bangallabs.web.id, www.bangallabs.web.id {
    encode zstd gzip
    reverse_proxy bangallabs-web:3000
}
```

Jika DNS `www` belum dibuat, gunakan hanya domain utama:

```caddyfile
bangallabs.web.id {
    encode zstd gzip
    reverse_proxy bangallabs-web:3000
}
```

Format, validasi, lalu reload. Jangan reload jika validasi gagal:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy --no-pager
```

Tes HTTP dari komputer lokal:

```bash
curl -I http://bangallabs.web.id
```

## 7. Periksa HTTPS otomatis

Caddy otomatis meminta dan memperbarui sertifikat HTTPS. Pantau log jika sertifikat masih diproses:

```bash
sudo journalctl -u caddy --no-pager -n 100
```

Periksa website:

```bash
curl -I https://bangallabs.web.id
```

Jika `bangallabs.my.id` juga dimiliki dan DNS-nya mengarah ke VPS, tambahkan redirect opsional ke Caddyfile:

```caddyfile
bangallabs.my.id, www.bangallabs.my.id {
    redir https://bangallabs.web.id{uri} permanent
}
```

Kemudian validasi dan reload kembali:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Kemudian buka `https://bangallabs.web.id` di browser.

## 8. Firewall opsional

Jalankan bagian ini hanya jika VPS menggunakan UFW. Izinkan SSH terlebih dahulu agar akses tidak terputus:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

Jika UFW belum aktif dan Anda memang ingin mengaktifkannya:

```bash
sudo ufw enable
```

Port `3100` tidak perlu dibuka karena Docker hanya mempublikasikannya ke `127.0.0.1` untuk Caddy.

## 9. Checklist setelah deployment

Periksa secara manual:

1. Halaman terbuka melalui HTTPS tanpa peringatan sertifikat.
2. `http://bangallabs.web.id` berpindah ke HTTPS.
3. Logo dan gambar tampil.
4. Menu navigasi berfungsi.
5. Tombol WhatsApp membuka nomor yang benar.
6. Form kontak membuka WhatsApp dengan isi form.
7. Email dan LinkedIn mengarah ke akun yang benar.
8. `https://bangallabs.web.id/robots.txt` dapat dibuka.
9. `https://bangallabs.web.id/sitemap.xml` dapat dibuka.
10. Event terlihat di GA4 Realtime jika Measurement ID sudah dipasang.

## 10. Cara update website

Sebelum update, buat backup source yang sedang aktif di VPS:

```bash
ssh <VPS_USER>@<VPS_IP>
sudo tar -czf /opt/bangallabs-backup-$(date +%Y%m%d-%H%M).tar.gz -C /opt website
exit
```

Copy versi terbaru dari komputer lokal:

```bash
cd /Users/newuser/ali/project/bangAllabs

rsync -avz \
  --exclude node_modules \
  --exclude .next \
  --exclude .env.local \
  --exclude .env.production \
  website/ <VPS_USER>@<VPS_IP>:/opt/website/
```

Rebuild di VPS:

```bash
ssh <VPS_USER>@<VPS_IP>
cd /opt/website
docker compose --env-file .env.production up -d --build
docker compose ps
docker compose logs --tail=100 web
```

Karena analytics dan metadata dimasukkan saat proses build, perubahan `NEXT_PUBLIC_GA_ID`, domain, email, atau WhatsApp juga memerlukan perintah rebuild di atas.

## 11. Perintah operasional

Melihat status:

```bash
cd /opt/website
docker compose ps
```

Melihat log berjalan:

```bash
docker compose logs -f web
```

Restart aplikasi:

```bash
docker compose restart web
```

Menghentikan aplikasi:

```bash
docker compose down
```

Menjalankan kembali:

```bash
docker compose --env-file .env.production up -d
```

## 12. Troubleshooting

### Website menampilkan 502 Bad Gateway

```bash
cd /opt/website
docker compose ps
docker compose logs --tail=200 web
curl -I http://127.0.0.1:3100
```

Jika container berhenti, rebuild:

```bash
docker compose --env-file .env.production up -d --build
```

### Caddy gagal reload

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo journalctl -u caddy --no-pager -n 100
```

Jangan reload sampai `caddy validate` menyatakan konfigurasi valid. Untuk mengembalikan backup:

```bash
sudo cp /etc/caddy/Caddyfile.backup /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### Caddy gagal menerbitkan HTTPS

Pastikan DNS sudah benar:

```bash
dig +short bangallabs.web.id
dig +short www.bangallabs.web.id
```

Pastikan port 80/443 dapat diakses dan Caddy berjalan:

```bash
sudo systemctl status caddy
sudo ss -lntp | grep -E ':80|:443'
```

### Analytics tidak muncul

Periksa Measurement ID:

```bash
cd /opt/website
grep NEXT_PUBLIC_GA_ID .env.production
```

Setelah memperbaiki nilainya, selalu rebuild:

```bash
docker compose --env-file .env.production up -d --build
```

Kemudian periksa GA4 Realtime sambil membuka website dari browser yang tidak memblokir analytics.
