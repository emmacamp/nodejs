import { USERS } from "../db.js";

const authByEmailPwd = ({email, password}) => {
    console.log({ email, password });
    const user = USERS.find((user) => user.email === email);
    if (!user) throw new Error();

    if (user.password !== password) throw new Error();

    return user;
};

export default authByEmailPwd;