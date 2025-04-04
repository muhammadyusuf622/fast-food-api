import { config } from "dotenv";


config()

export const ACCSESS_TOKEN_SECRET_KEY = process.env.ACCSESS_TOKEN_SECRET_KEY;

export const ACCSESS_TOKEN_EXPITR_TIME = process.env.ACCSESS_TOKEN_EXPITR_TIME;

export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export const REFRESH_TOKEN_EXPITR_TIME = process.env.REFRESH_TOKEN_EXPITR_TIME;