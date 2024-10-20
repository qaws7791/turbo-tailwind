export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  databaseUrl: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  cookieSecret: process.env.COOKIE_SECRET,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
  redisPassword: process.env.REDIS_PASSWORD,
  sessionSecret: process.env.SESSION_SECRET,
  sessionSalt: process.env.SESSION_SALT,
});
