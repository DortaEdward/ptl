import { Elysia, t } from "elysia";
import { Database } from "bun:sqlite"
import { cors } from "@elysiajs/cors"
import { logger } from '@bogeychan/elysia-logger';

const db = new Database("db.sqlite")
const userTableExist = "CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);"

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
  }, {
    body:t.Object({
      username:t.String(),
      password:t.String(),
    })
  })
)
.listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);



/*
  [x] user sign up
  [] user sign in
  [] create session
  [] create token
*/