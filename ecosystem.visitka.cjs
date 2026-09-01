module.exports = {
  apps: [
    {
      name: 'visitka',
      cwd: process.env.APP_DIR || '/var/www/visitka',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3200,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
    },
  ],
}
