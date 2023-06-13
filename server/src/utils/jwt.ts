import jwt, { SignOptions } from "jsonwebtoken";

export function signJwtToken(email: string, options?: SignOptions) {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRE_TIME;

  const token = jwt.sign({ email }, secret, { expiresIn, ...options });

  return token;
}

export function verifyJwtToken(token: string) {
  const secret = process.env.JWT_SECRET as string;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err?.message == "jwt malformed") throw Error("invalid jwt token");
      else throw err;
    }

    return decoded;
  });
}
