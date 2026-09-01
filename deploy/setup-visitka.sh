#!/usr/bin/env bash
set -euo pipefail

# Первичная настройка / деплой на самом сервере (порт 3200).
#
# Использование:
#   sudo bash deploy/setup-visitka.sh
#
# Предполагается, что репозиторий уже склонирован в APP_DIR
# (по умолчанию каталог на два уровня выше этого скрипта).
# Повторный запуск = обновление: git pull -> build -> pm2 reload.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
PORT=3200

echo "==> APP_DIR: $APP_DIR (порт $PORT)"
cd "$APP_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "==> Ставлю Node.js 20"
  apt-get update
  apt-get install -y ca-certificates curl gnupg
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list
  apt-get update
  apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm i -g pm2
fi

if [ -d .git ]; then
  echo "==> git pull"
  git pull --ff-only || true
fi

echo "==> npm ci && build"
npm ci
npm run build

echo "==> Запуск pm2 на порту $PORT"
pm2 delete visitka >/dev/null 2>&1 || true
APP_DIR="$APP_DIR" pm2 start ecosystem.visitka.cjs
pm2 save

if [[ -n "${SUDO_USER:-}" && "$SUDO_USER" != "root" ]]; then
  pm2 startup systemd -u "$SUDO_USER" --hp "/home/$SUDO_USER" || true
else
  pm2 startup systemd -u root --hp /root || true
fi

echo "==> Готово. http://127.0.0.1:$PORT"
echo "    Не забудь настроить nginx-прокси на этот порт при необходимости."
