import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session";
import type { Response, Request } from "express"
import { createToken, verifyJwt } from "../utils/jwt";
import UserModel from "../models/user";

export async function createSession(userId: string, userAgent: string){
    const exists = await SessionModel.findOne({
      userId: userId
    })
    if(exists){
      return exists.toJSON()
    }
    const session = await SessionModel.create({
        userId: userId,
        userAgent
    })   
    return session.toJSON();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update:UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query,update);
}

export async function findSession(res: Response){
    const user = res.locals.user._id
    const session = await SessionModel.findOne({
        userId: user,
    })   

    if(!session){
        return null
    }

    res.send(session);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded) return false;

  const session = await SessionModel.findById(decoded.sessionId || "");

  if (!session || !session.valid) return false;

  const user = await UserModel.findById(session.userId);

  if (!user) return false;

  const accessToken = createToken(
    user.id, 
    user.username,
    session.id, 
    "accessTokenPrivateKey",
  );

  return accessToken;
}

export async function deleteSessionHandler(res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
