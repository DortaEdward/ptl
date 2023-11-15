import jwt from "jsonwebtoken"

export async function createToken(userId :string, username: string,sessionId:string, tokenKey:string, expiresIn: string, options: any){

    let key;
    let time;
    
    if(tokenKey == "accessToken"){ 
        key = process.env.AT_PRIVATE_KEY as string
        time = "15m"
    } else{ 
        key = process.env.RT_PRIVATE_KEY as string 
        time = "1y"
    } 
    
    const payload = {
        id: userId,
        username,
        sessionId,
        time
    }
    
    return jwt.sign(payload,"auth",{ expiresIn: time }) 

}
