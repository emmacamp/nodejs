import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS } from "../db.js";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const sessions = [];
const authSessionRouter = Router();

//Login con email y password
authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log({ email, password });

    if (!email || !password) return res.sendStatus(400);

    try {
        const { guid } = authByEmailPwd({email, password});

        const sessionId = nanoid();
        sessions.push({ sessionId, guid });

        console.log({ sessionId, guid });

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
        });
        return res.send();
    } catch (err) {
        return res.sendStatus(401);
    }
});

//Solicitud autenticada con sesion para obtener el perfil del usuario
authSessionRouter.get("/profile", (req, res) => {
    const { cookies } = req;

    if (!cookies.sessionId) return res.sendStatus(401);

    const userSession = sessions.find(
        (session) => session.sessionId === cookies.sessionId
    );

    if (!userSession) return res.sendStatus(401);

    const user = USERS.find((user) => user.guid === userSession.guid);

    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);
});


// Logout
authSessionRouter.post("/logout", (req, res) => {
    const { cookies } = req;

    if (!cookies.sessionId) return res.sendStatus(401);

    const sessionIndex = sessions.findIndex(
        (session) => session.sessionId === cookies.sessionId
    );

    if (sessionIndex === -1) return res.sendStatus(401);

    sessions.splice(sessionIndex, 1);

    res.clearCookie("sessionId");

    return res.send();
});


console.log({ sessions});

export default authSessionRouter;