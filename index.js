import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth-token.js';
import authSessionRouter from './routes/auth-session.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use("/account", accountRouter);
expressApp.use("/auth", authRouter);
expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);


expressApp.listen(PORT, () => {
    console.clear()
    console.log(`Servidor levantado en el puerto ${PORT}`)

});