import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth";
import connect from "./db/db";

const app = express()

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json())

app.use('/auth', authRouter)

const PORT = process.env.PORT || 6969;

app.listen(PORT,  () => {
    connect()
    console.log("Listening on port: ", PORT)
})
