import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/session";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.get("x-access-token")?.replace("Bearer","").trim();

  const refreshToken = req.get("x-refresh");

  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
