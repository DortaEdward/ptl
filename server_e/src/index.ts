import { Elysia, t } from "elysia";
import { Database } from "bun:sqlite"
import { cors } from "@elysiajs/cors"
import { logger } from '@bogeychan/elysia-logger';
import { jwt } from "@elysiajs/jwt"
import { cookie } from "@elysiajs/cookie"

const db = new Database("db.sqlite")
const userTableExist = "CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);"
const sessionTableExist = "CREATE TABLE IF NOT EXISTS session ( id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL, active INTEGER NOT NULL);"

const jwtSecret = process.env.JWTSECRET
const PORT = process.env.PORT

type User = {
  id: number
  username: string
  password: string
}

type AccessTokenPayload = {
  userId: number
  sessionId: number
  username: string
  expiresAt: number
}

async function generateAccessTokenPayload(userId:number, sessionId: number, username: string){
  const expiresIn = 3600 // 1 hour
  const expiresAt = Date.now() + expiresIn * 1000
  const payload: AccessTokenPayload = {
    userId,
    sessionId,
    username,
    expiresAt
  }
  return payload
}

async function findUser(username: string){
  const query = db.query("SELECT * FROM user WHERE username = $username LIMIT 1")
  const result = query.all({
    $username: username
  }) 
  return result[0]
}

async function findSession(userId: number){  
  const query = db.query("SELECT * FROM session WHERE userId = $userId LIMIT 1")
  const result = query.all({$userId: userId })
  return result[0] 
}

async function createSession(userId: number){
  const query = db.query("INSERT INTO session (userId, active) VALUES ($userId,$active)")
  await query.all({
    $userId: userId,
    $active: true
  })
  console.log("Session created?")
}

async function createUser(username: string, password: string){
  const query = db.query("INSERT INTO user (username, password) VALUES ($username, $password)")
  await query.all({
    $username: username,
    $password: password
  })
}

const app = new Elysia()
.use(cors())
.use(jwt({
  name:"jwt",
  secret: jwtSecret as string
}))
.use(cookie())
.use(
  logger({
    level: 'error'
  })
)
.get("/", async (ctx) => {
  const authCookie = await ctx.jwt.verify(ctx.cookie["auth"])
  console.log(ctx.cookie)
  "Hello Elysia"
})
.group("/auth", app => app
  .post("/signup", async (ctx) => {  

    ctx.log.info(ctx.request,"Request")
    db.exec(userTableExist)

    const user = await findUser(ctx.body.username)      
    if(user){
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
  .post("/signin", async (ctx) => {
    db.exec(sessionTableExist)
    /*
      refresh token
      access token
      set cookies
    */
    const user = await findUser(ctx.body.username);
    if(!user){
      ctx.set.status = 409 
      return "User doesn't exist"
    }

    const validatePassword = await Bun.password.verify(ctx.body.password,user.password)

    if(!validatePassword){
      ctx.set.status = 409 
      return "Unauthorized"
    }
    
    let session; 
    const foundSession = await findSession(user.id)

    if(!foundSession){
      console.log("No Session")
      session = await createSession(user.id) 
    }

    // if session exist and active is false set it to true

    session = foundSession
    const payload = generateAccessTokenPayload(user.id,session.id,user.username)
    ctx.setCookie(
      "auth",
      await ctx.jwt.sign(payload),{
        httpOnly: true,
        maxAge: 7 * 86400,
      }
    )
    console.log("Session active or created")
    return ctx.cookie
  },{
    body:t.Object({
      username:t.String(),
      password:t.String(),
    })
  })
)
.listen(PORT as string)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);



/*
  [x] user sign up
  [x] user sign in
  [x] create session
  [x] create token
*/