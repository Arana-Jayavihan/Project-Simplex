import mongoose from "mongoose";
import configs from "../configs/index.js";
import logger from "../utils/logger.js";

let db;

const connect = async () => {
  const MONGODB_URL = configs.DBConectionString;

  if (db) return;

  mongoose
    .connect(MONGODB_URL)
    .then((connection) => {
      db = connection;
      logger.info(`DB Synced`);
    })
    .catch((error) => {
      logger.error(error.message);
    });
};

export { connect };
