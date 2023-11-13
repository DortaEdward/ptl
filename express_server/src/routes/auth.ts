import { Router, type Request, type Response } from "express";
import UserModel from "../models/user";
import { z } from "zod"
import { createUser } from "../services/user";

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

        const user = await createUser(req.body) 
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username
        })

    } catch(err: any){
        res.status(500)
    }
})

authRouter.post("/signup", async (req: Request, res: Response) => {  
    // validate user
    // create session
    // create access token
    // create refresh token
})


export default authRouter
