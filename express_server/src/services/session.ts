import SessionModel from "../models/session";

export async function createSession(userId: string, userAgent: string){
    const session = await SessionModel.create({
        userId: userId,
        userAgent
    })   
    return session.toJSON();
}

export async function findSession(userId: string){
    const session = await SessionModel.findOne({
        userId: userId,
    })   

    if(!session){
        return null
    }

    return session.toJSON();
}
