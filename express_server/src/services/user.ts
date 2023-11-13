import UserModel from "../models/user";

type CreateUserPayload ={
    email: string,
    username: string,
    password: string
}

// create user
export async function createUser(payload: CreateUserPayload){
    // validate user does not exist
    try{
        payload.password = Bun.password.hashSync(payload.password, "bcrypt")
        const user = await UserModel.create(payload)
        return user    
    } catch(err: any){
        throw new Error(err)
    } 
}
// validate password
export async function validatePassword(password: string, hash: string){
    return Bun.password.verifySync(password, hash, "bcrypt")
}


// find user
export async function findUser(email: string){
    try{
    const user = await UserModel.findOne({
        email:email
    })
    if(!user){
        throw new Error("Unauthorized")
    }
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    }
    return payload
    } catch(err: any){
        throw new Error("Unauthorized")
    }
}

