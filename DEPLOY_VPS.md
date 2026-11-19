# Deploy BangAl Labs melalui Git Pull

Panduan ini memigrasikan deployment lama berbasis `rsync` ke deployment berbasis Git tanpa mengubah Caddy, domain, port, atau external Docker network.

## Topologi production

- Repository Git: `https://github.com/alimurtadho/bangallabs-profile.git`
- Branch production: `main`
- Source lama/rollback: `/opt/website`
- Source Git baru: `/opt/bangallabs-profile`
- Compose project dipertahankan: `website`
- Container: `bangallabs-web`
- Host port: `127.0.0.1:3100`
- Container port: `3000`
- External network: `cv-abu-net`
- Reverse proxy: `cv-abu-caddy`
- Caddyfile: `/opt/apps/docker/caddy/Caddyfile`
- Domain: `https://bangallabs.web.id`

BangAl Labs tidak memiliki database atau Docker volume. Data production yang perlu dipertahankan adalah `.env.production`, konfigurasi Compose lama, Caddyfile, metadata container, dan image Docker untuk rollback. Jangan menghentikan atau mengubah `cv-abu-db`, `cv-abu-app`, Family Connect, atau Caddy selama proses backup.

## 1. Backup deployment lama

Jalankan sebagai `root` di VPS:

```bash
cd /opt

BANGAL_STAMP=$(date +%Y%m%d-%H%M%S)
BANGAL_BACKUP_DIR="/opt/backups/bangallabs/$BANGAL_STAMP"

install -d -m 700 "$BANGAL_BACKUP_DIR"

cp -a /opt/website/.env.production "$BANGAL_BACKUP_DIR/.env.production"
cp -a /opt/website/docker-compose.yml "$BANGAL_BACKUP_DIR/docker-compose.yml"
cp -a /opt/website/Dockerfile "$BANGAL_BACKUP_DIR/Dockerfile"
cp -a /opt/apps/docker/caddy/Caddyfile "$BANGAL_BACKUP_DIR/Caddyfile"

tar \
  --exclude='website/node_modules' \
  --exclude='website/.next' \
  -czf "$BANGAL_BACKUP_DIR/website-source.tar.gz" \
  -C /opt website

docker inspect bangallabs-web > "$BANGAL_BACKUP_DIR/bangallabs-web.inspect.json"
docker network inspect cv-abu-net > "$BANGAL_BACKUP_DIR/cv-abu-net.inspect.json"

docker compose \
  -p website \
  -f /opt/website/docker-compose.yml \
  --env-file /opt/website/.env.production \
  config > "$BANGAL_BACKUP_DIR/compose.rendered.yml"

docker image tag \
  "$(docker inspect --format '{{.Image}}' bangallabs-web)" \
  "bangallabs-web:rollback-$BANGAL_STAMP"

chmod 600 "$BANGAL_BACKUP_DIR/.env.production" "$BANGAL_BACKUP_DIR/compose.rendered.yml"

echo "Backup tersimpan di: $BANGAL_BACKUP_DIR"
ls -lah "$BANGAL_BACKUP_DIR"
docker image ls 'bangallabs-web:rollback-*'
```

Folder `/opt/website` jangan dihapus. Folder tersebut menjadi rollback source sampai deployment Git terbukti stabil.

## 2. Validasi repository baru

```bash
cd /opt/bangallabs-profile

pwd
git remote -v
git branch --show-current
git status --short
```

Hasil yang diharapkan:

- `pwd` menampilkan `/opt/bangallabs-profile`.
- Remote `origin` mengarah ke `alimurtadho/bangallabs-profile.git`.
- Branch aktif adalah `main`.
- `git status --short` kosong.

## 3. Ambil source terbaru dan pindahkan environment

```bash
cd /opt/bangallabs-profile

git fetch --prune origin
git pull --ff-only origin main

install -m 600 \
  /opt/website/.env.production \
  /opt/bangallabs-profile/.env.production

grep -E '^(NEXT_PUBLIC_SITE_URL|CONTACT_EMAIL|WHATSAPP_NUMBER|NEXT_PUBLIC_GA_ID)=' \
  /opt/bangallabs-profile/.env.production
```

Periksa nilai hasil `grep`. File `.env.production` diabaikan oleh Git dan tidak boleh di-commit.

## 4. Validasi sebelum mengganti container

```bash
cd /opt/bangallabs-profile

docker network inspect cv-abu-net >/dev/null

docker compose \
  -p website \
  --env-file .env.production \
  config -q

docker compose \
  -p website \
  --env-file .env.production \
  build web
```

Build dilakukan saat container lama masih berjalan. Jika build gagal, container production tidak berubah.

## 5. Recreate hanya BangAl Labs

```bash
cd /opt/bangallabs-profile

docker compose \
  -p website \
  --env-file .env.production \
  up -d --no-deps --force-recreate web
```

Flag `-p website` penting. Project name ini mempertahankan identitas Compose lama walaupun source berpindah dari `/opt/website` ke `/opt/bangallabs-profile`.

Perintah tersebut hanya melakukan recreate service `web`. Container Caddy, CV Abu, PostgreSQL, dan Family Connect tidak ikut direstart.

## 6. Verifikasi deployment

```bash
cd /opt/bangallabs-profile

docker compose -p website --env-file .env.production ps
docker compose -p website --env-file .env.production logs --tail=100 web

curl --max-time 15 -I http://127.0.0.1:3100

docker exec cv-abu-caddy sh -c \
  'wget -T 10 -S -O /dev/null http://bangallabs-web:3000 2>&1 | head -20'

curl --max-time 20 -I https://bangallabs.web.id
```

Hasil yang diharapkan:

- Container `bangallabs-web` berstatus `Up`.
- Loopback `127.0.0.1:3100` merespons `200`.
- Caddy dapat mengakses `bangallabs-web:3000`.
- Domain HTTPS merespons `200`.

Periksa bahwa container lain tidak berubah:

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

## 7. Update rutin berikutnya

Setelah workflow Git aktif, deployment berikutnya cukup:

```bash
cd /opt/bangallabs-profile

git status --short
git fetch --prune origin
git pull --ff-only origin main

docker compose -p website --env-file .env.production config -q
docker compose -p website --env-file .env.production build web
docker compose -p website --env-file .env.production up -d --no-deps --force-recreate web

docker compose -p website --env-file .env.production ps
curl --max-time 15 -I http://127.0.0.1:3100
curl --max-time 20 -I https://bangallabs.web.id
```

Jika `git status --short` tidak kosong, hentikan proses dan periksa perubahan server. Jangan memakai `git reset --hard` karena dapat menghapus perubahan atau konfigurasi yang belum disimpan.

## 8. Rollback ke source lama

Jika deployment baru gagal tetapi folder lama masih tersedia:

```bash
cd /opt/website

docker compose \
  -p website \
  -f docker-compose.yml \
  --env-file .env.production \
  up -d --no-deps --force-recreate web

curl --max-time 15 -I http://127.0.0.1:3100
curl --max-time 20 -I https://bangallabs.web.id
```

Jika image lama perlu dipulihkan, lihat tag backup:

```bash
docker image ls 'bangallabs-web:rollback-*'
```

Tag rollback jangan dihapus sampai versi Git baru stabil dan sudah diverifikasi.
