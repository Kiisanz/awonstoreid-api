import config from "../config/db.conf.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
});

export default sequelize