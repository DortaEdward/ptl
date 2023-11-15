import { Router, type Request, type Response } from "express";
import UserModel from "../models/user";
import { z } from "zod"
import { createUser, validatePassword } from "../services/user";
import { createSession, reIssueAccessToken } from "../services/session";
import { createToken, verifyJwt } from "../utils/jwt";

const authRouter = Router()

authRouter.get("/", async (_: Request,res: Response) => {
    const users = await UserModel.find() 
    res.json({
        status: res.statusCode,
        users: users
    })
});

authRouter.post("/signup", async (req: Request, res: Response) => {  
    const bodyValidator = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(8)
    })
    try{
        const isValid = bodyValidator.parse(req.body);
        if(!isValid){
            return res.status(500)
        }
        const userExist = await UserModel.findOne({email:req.body.user})
        if(userExist != null){
            return res.status(401).send("Invalid") 
        }
        const user = await createUser(req.body) 
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username
        });
    } catch(err: any){
        res.status(500)
    }
})

authRouter.post("/signin", async (req: Request, res: Response) => {  
    // validate user
    const bodyValidator = z.object({
        email: z.string(),
        password: z.string()
    })
    const isBodyValid = bodyValidator.parse(req.body);
    if(!isBodyValid){
        res.status(500).send("Unauthorized")
    }
    try{
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if(!user){            
            return res.status(500).send("Unauthorized")
        }

        const isPasswordValid = validatePassword(req.body.password,user.password);
        if(!isPasswordValid){            
            return res.status(500).send("Unauthorized")
        }
        
        const session = await createSession(user._id, req.get("user-agent") || "")

        const accessToken = await createToken(
            user._id, user.username,
            session._id, "accessToken"
        )

        const refreshToken = await createToken(
            user._id, user.username,
            session._id, "refreshToken",
        )
        
        res.json({ accessToken, refreshToken });
    } catch(err: any){
        console.log(err.message)
        return res.status(500).send("Unauthorized")
    }
    
})


export default authRouter
