# BangAl Labs Website

Canonical company profile and lead-generation site for BangAl Labs. The recommended public domain is `bangallabs.web.id`; use `bangallabs.my.id` only as an optional redirect.

Panduan deployment VPS lengkap untuk folder `/opt/website` tersedia di [`DEPLOY_VPS.md`](./DEPLOY_VPS.md).

## Profile positioning

- Brand: BangAl Labs
- Category: AI, Data & Digital Transformation Consulting
- Founder profile: Ali Murtadho — Founder & Lead AI/Data Consultant
- Primary conversion: WhatsApp consultation
- Secondary proof: project portfolio, industry experience, and technical capabilities

Keep client names, project counts, and results only when they are approved for public use. Replace confidential details with outcome-focused summaries.

## Local trial

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Environment

```dotenv
NEXT_PUBLIC_SITE_URL=https://bangallabs.web.id
CONTACT_EMAIL=hello@bangallabs.web.id
WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Create the mailbox or replace `CONTACT_EMAIL` before going live. GA4 is disabled automatically when `NEXT_PUBLIC_GA_ID` is empty.

## VPS deployment

1. Point DNS `A` records for `@` and `www` to the VPS public IP.
2. Copy `.env.example` to `.env.production` and set the real values.
3. Run `docker compose --env-file .env.production up -d --build`. The application joins the existing external network `cv-abu-net`; loopback port `3100` remains available only for direct VPS checks.
4. Add the block from `deploy/Caddyfile.example` to the existing `/etc/caddy/Caddyfile` without changing the `cv-abu-app` block.
5. Validate and reload Caddy after DNS resolves:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy obtains and renews HTTPS certificates automatically. If `bangallabs.my.id` is also owned and pointed to the VPS, enable its optional redirect block.

## Analytics checklist

1. Create one GA4 property with timezone `Asia/Jakarta` and a Web data stream for `https://bangallabs.web.id`.
2. Put the `G-...` Measurement ID in `.env.production`, then rebuild the container.
3. Verify traffic in GA4 Realtime.
4. Mark `generate_lead` as a key event. The site also records WhatsApp, email, LinkedIn, portfolio, and form-attempt clicks.
5. Add `bangallabs.web.id` as a Search Console Domain property and verify it by DNS TXT record.

## Production checks

```bash
npm run build
docker compose config
curl -I https://bangallabs.web.id
```
