#!/usr/bin/env bash
set -euo pipefail

# Usage:
# sudo bash deploy/setup-scralex.sh
#
# Prerequisites:
# - DNS A record for scralex.ru and www.scralex.ru points to this server IP
# - Ubuntu/Debian server with sudo access

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DOMAIN="scralex.ru"

echo "==> Installing dependencies"
apt update
apt install -y nginx certbot python3-certbot-nginx

if command -v node >/dev/null 2>&1; then
  NODE_BIN="node"
elif command -v nodejs >/dev/null 2>&1; then
  NODE_BIN="nodejs"
else
  echo "==> Node.js not found, installing Node.js 20"
  apt install -y ca-certificates curl gnupg
  # Clean old NodeSource entries to avoid signed-by conflicts.
  rm -f /etc/apt/sources.list.d/nodesource.list
  rm -f /etc/apt/sources.list.d/nodesource*.list
  sed -i '/deb\.nodesource\.com\/node_20\.x/d' /etc/apt/sources.list 2>/dev/null || true
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list
  apt update
  apt install -y nodejs

  if command -v node >/dev/null 2>&1; then
    NODE_BIN="node"
  elif command -v nodejs >/dev/null 2>&1; then
    NODE_BIN="nodejs"
  else
    echo "Failed to install Node.js automatically."
    exit 1
  fi
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm i -g pm2
fi

echo "==> Using Node binary: $NODE_BIN"
"$NODE_BIN" -v

echo "==> Building Next.js app"
cd "$APP_DIR"
npm ci
npm run build

echo "==> Starting app with PM2 on port 3050"
pm2 delete scralex >/dev/null 2>&1 || true
APP_DIR="$APP_DIR" pm2 start ecosystem.config.cjs
pm2 save
if [[ -n "${SUDO_USER:-}" && "$SUDO_USER" != "root" ]]; then
  pm2 startup systemd -u "$SUDO_USER" --hp "/home/$SUDO_USER" || true
else
  pm2 startup systemd -u root --hp /root || true
fi

echo "==> Configuring Nginx"
cp deploy/nginx.scralex.ru.conf /etc/nginx/sites-available/scralex.ru
ln -sf /etc/nginx/sites-available/scralex.ru /etc/nginx/sites-enabled/scralex.ru
nginx -t
systemctl reload nginx

echo "==> Issuing SSL certificate"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect

echo "==> Done"
echo "Site should be available at https://$DOMAIN"
