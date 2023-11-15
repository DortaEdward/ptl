import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth";
import connect from "./db/db";
import deserializeUser from "./middleware/deserializeUser";
import { requireUser } from "./middleware/requireUser";

const app = express()

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(deserializeUser);

app.use('/auth', authRouter)
app.use('/test', (req,res) => {
    res.send("Test")
})
app.use('/test1', requireUser ,(req,res) => {
    res.send("Your logged in")
})

const PORT = process.env.PORT || 6969;

app.listen(PORT,  () => {
    connect()
    console.log("Listening on port: ", PORT)
})
