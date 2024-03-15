import { config } from "dotenv";
import * as process from "process";

config({ path: `.env` });

export const { NODE_ENV, PORT, DB_URL, SECRET_KEY } = process.env;
