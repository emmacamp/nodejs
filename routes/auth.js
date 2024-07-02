import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRouter = Router();

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const BAD_REQUEST = 400;

//Endpoint público (No autenticado y no autorizado)
authRouter.get("/public", (req, res) => res.send("Endpoint público"));

//Endpoint autenticado para todo usuario registrado
authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(BAD_REQUEST);

    try {
        const user = authByEmailPwd({ email, password });
        return res.send(`Usuario ${user.name} autenticado`);
    } catch (err) {
        return res.sendStatus(UNAUTHORIZED);
    }
});

//Endpoint autorizado a administradores
authRouter.post("/autorized", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send(BAD_REQUEST);

    try {
        const user = authByEmailPwd({email, password});

        if (user.role !== "admin") return res.send(FORBIDDEN);

        return res.send(`Usuario administrador ${user.name}`);
    } catch (err) {
        return res.sendStatus(UNAUTHORIZED);
    }
});

export default authRouter;