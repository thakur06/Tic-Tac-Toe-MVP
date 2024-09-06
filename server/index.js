const express = require('express');
const cors = require('cors');
const { StreamChat } = require('stream-chat');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const api_key = process.env.API_key;
const api_secret = process.env.API_SECRET;

const connection = StreamChat.getInstance(api_key, api_secret);
app.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const { users } = await connection.queryUsers({ Uname: name });

        if (users.length == 0) return res.json({ message: "User not found" })
        console.log(users[0])
        const pass = await brcypt.compare(password, users[0].hashedPassword);
        const token = connection.createToken(users[0].id);


        if (pass) {

            res.json({
                token,
                Fname: users[0].Fname,
                Lname: users[0].Lname,
                Uname: users[0].Uname,
                uId: users[0].id
            })
        }
        else {
            res.status(401).send({ mgs: "User not found", status: 404 });
        }

    } catch (error) {
        res.json(error);
    }

})


app.post("/signin", async (req, res) => {
    try {
        const { Fname, Lname, Uname, password } = req.body;
        const uId = uuidv4();
        const hashedPassword = await brcypt.hash(password, 10);
        const token = connection.createToken(uId);
        res.json({ token, Fname, Lname, Uname, uId, hashedPassword });
    }
    catch (err) {
        res.json(err);
    }
})
app.get("/", (req, res) => {
    res.send("hi vercel cors not working");
})
app.listen(process.env.PORT || 8000, () => {
    console.log("running on 8000")
})
