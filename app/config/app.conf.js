export default {
  appName: "MyApp",
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  debug: process.env.DEBUG || true,
  version: "1.0.0",
  description: "Awonstore ID API",
  apiPrefix: "/api/v1/",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key",
  allowCors: true,
  database: {
    type: "mysql",
    // url: process.env.DATABASE_URL || "mysql://localhost:3306/myapp",
  },
  logging: {
    level: "info",
    file: "/logs/app.log",
  },
};
