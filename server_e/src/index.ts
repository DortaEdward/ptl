import { Elysia } from "elysia";
import { Database } from "bun:sqlite"
import { cors } from "@elysiajs/cors"
import { logger } from '@bogeychan/elysia-logger';

const db = new Database("db.sqlite")
const userTableExist = "CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);"

const users = [{
  username: "fmdeemon",
  password:"Password"
}]
type signInBody = {
  username: string
  password: string
}

function signup(body: signInBody){
  /*
    check if user exists
      if they do return an error
    encrypt password
    create user
  */ 
}

async function findUser(username: string){
  const query = db.query("SELECT * FROM user WHERE username = $username LIMIT 1")
  const result = query.all({
    $username: username
  })
  return result.length > 0
}

async function createUser(username: string, password: string){
  const query = db.query("INSERT INTO user (username, password) VALUES ($username, $password)")
  const result = query.all({
    $username: username,
    $password: password
  })
  console.log("Result: ",result)
}

function signin(){
  /*
    find  user
      if user not in tabel return an error 
    compare password to the encrypt password
      if incorrect return error
    find session
      if session doesnt exist create one
  */ 
}

const app = new Elysia()
.use(cors())
.use(
  logger({
    level: 'error'
  })
)
.get("/", () => {
  "Hello Elysia"
})
.group("/auth", app => app
  .post("/signup", async (ctx) => {
    ctx.log.info(ctx.request,"Request")
    db.exec(userTableExist)
    const userExists = await findUser(ctx.body.username)      
    if(userExists){
      ctx.set.status = 409 
      return "user exists"
    }
    const ePw = await Bun.password.hash(ctx.body.password,{
      algorithm:"bcrypt",
      cost:10
    })
    ctx.set.status = 200
    await createUser(ctx.body.username, ePw) 
  })
)
.listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);



/*
  user sign up
  user sign in
  create session
  create token
*/