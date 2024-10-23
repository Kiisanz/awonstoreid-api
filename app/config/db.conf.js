import { config as dotenvConfig } from "dotenv"; 
dotenvConfig();


const dbConfig = {
    development: {
        dialect: "mysql",
        host: process.env.DB_HOST || "localhost",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "myapp_dev",
        port: process.env.DB_PORT || 3306,
        logging: false, 
    },
    production: {
        dialect: "mysql",
        host: process.env.DB_HOST || "localhost",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "myapp_prod",
        port: process.env.DB_PORT || 3306,
        logging: false, 
    },
    test: {
        dialect: "mysql",
        host: process.env.DB_HOST || "localhost",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "myapp_test",
        port: process.env.DB_PORT || 3306,
        logging: false, 
    }
};


const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

export default config
