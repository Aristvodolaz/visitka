#!/usr/bin/env bash
set -euo pipefail

# Деплой visitka на сервер (порт 3200), запуск с локальной машины.
#
# Использование:
#   DEPLOY_HOST=1.2.3.4 DEPLOY_USER=root bash deploy/deploy.sh
#
# Переменные (можно переопределить):
#   DEPLOY_HOST  - IP/домен сервера            (обязательно)
#   DEPLOY_USER  - ssh-пользователь            (по умолчанию: root)
#   DEPLOY_PATH  - каталог приложения на сервере (по умолчанию: /var/www/visitka)
#   DEPLOY_PORT  - ssh-порт                    (по умолчанию: 22)
#
# Что делает: rsync исходников на сервер -> npm ci -> npm run build ->
# перезапуск через pm2 на порту 3200.

DEPLOY_HOST="${DEPLOY_HOST:?нужно задать DEPLOY_HOST}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/visitka}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SSH="ssh -p $DEPLOY_PORT ${DEPLOY_USER}@${DEPLOY_HOST}"

echo "==> Цель: ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} (порт приложения 3200)"

echo "==> Создаю каталог на сервере"
$SSH "mkdir -p '$DEPLOY_PATH'"

echo "==> Синхронизирую файлы (rsync)"
rsync -az --delete \
  -e "ssh -p $DEPLOY_PORT" \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude 'out/' \
  --exclude '.env*' \
  "$APP_DIR/" "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "==> Сборка и запуск на сервере"
$SSH bash -s <<EOF
set -euo pipefail
export PATH="\$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:\$PATH"
cd '$DEPLOY_PATH'

npm ci
npm run build

if ! command -v pm2 >/dev/null 2>&1; then
  npm i -g pm2
fi

pm2 delete visitka >/dev/null 2>&1 || true
APP_DIR='$DEPLOY_PATH' pm2 start ecosystem.visitka.cjs
pm2 save
EOF

echo "==> Готово. Приложение слушает 127.0.0.1:3200 на сервере."
