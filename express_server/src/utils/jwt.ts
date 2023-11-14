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
    
    const signingKey = Buffer.from(
        key,
        "base64"
    ).toString("ascii");
    
    const payload = {
        id: userId,
        username,
        sessionId,
        expiresIn
    }
    
    const token = jwt.sign(payload,"auth",{expiresIn: time}) 
    return token

}
