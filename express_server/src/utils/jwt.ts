import jwt from "jsonwebtoken"
import config from '../../config';

export async function createToken(
  userId: string,
  username: string,
  sessionId: string,
  keyName: string,
) {
  let time;

  if (keyName == "accessToken") {
    time = "15m"
  } else {
    time = "1y"
  }

  const payload = {
    id: userId,
    username,
    sessionId,
    time
  }

  return jwt.sign(
    payload,
    config.private_key,
    {
      expiresIn: time,
      algorithm: "RS256"
    }
  )

}

export function verifyJwt(
  token: string,
) {
  try {
    const decoded = jwt.verify(token, config.public_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    // console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
