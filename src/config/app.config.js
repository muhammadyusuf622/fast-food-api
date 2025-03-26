import { config } from "dotenv";

config()

export const APP_PORT = parseInt(process.env.APP_PORT, 10) || 5000;
