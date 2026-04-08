#!/usr/bin/env bash
set -euo pipefail

# Usage:
# sudo bash deploy/setup-scralex.sh
#
# Prerequisites:
# - DNS A record for scralex.ru and www.scralex.ru points to this server IP
# - Ubuntu/Debian server with sudo access

APP_DIR="/var/www/scralex"
DOMAIN="scralex.ru"

echo "==> Installing dependencies"
apt update
apt install -y nginx certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node.js 20+ first."
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm i -g pm2
fi

echo "==> Building Next.js app"
cd "$APP_DIR"
npm ci
npm run build

echo "==> Starting app with PM2 on port 3050"
pm2 delete scralex >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u "$SUDO_USER" --hp "/home/$SUDO_USER" || true

echo "==> Configuring Nginx"
cp deploy/nginx.scralex.ru.conf /etc/nginx/sites-available/scralex.ru
ln -sf /etc/nginx/sites-available/scralex.ru /etc/nginx/sites-enabled/scralex.ru
nginx -t
systemctl reload nginx

echo "==> Issuing SSL certificate"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect

echo "==> Done"
echo "Site should be available at https://$DOMAIN"
