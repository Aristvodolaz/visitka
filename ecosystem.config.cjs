module.exports = {
  apps: [
    {
      name: 'scralex',
      cwd: '/var/www/scralex',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3050,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
    },
  ],
}
