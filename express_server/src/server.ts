import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import WebSocket from "ws";
import http from "http";

import authRouter from "./routes/auth";
import connect from "./db/db";
import deserializeUser from "./middleware/deserializeUser";
// import { requireUser } from "./middleware/requireUser";

const app = express()
const server = http.createServer(app);
const socket = new WebSocket.Server({ server })

const PORT = process.env.PORT || 6969;

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(deserializeUser);

app.use('/auth', authRouter)


socket.on("connection", (ws,req) =>{
    // on connection check if user is authed
    // if not disconnect them
    // else get their game stats and friends list
})

server.listen(PORT,  () => {
    connect()
    console.log("Listening on port: ", PORT)
})
