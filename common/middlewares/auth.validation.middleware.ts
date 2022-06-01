import jwt from "jsonwebtoken";
import { config } from "../../common/config/env.config";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const secret = config.jwt_secret;

export const verifyRefreshBodyField = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({ error: "need to pass refresh_token field" });
  }
};

export const validRefreshNeeded = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let b = Buffer.from(req.body.refresh_token, "base64");
  let refresh_token = b.toString();
  let hash = crypto
    .createHmac("sha512", req.body.jwt.refreshKey)
    .update(req.body.jwt.userId + secret)
    .digest("base64");
  if (hash === refresh_token) {
    req.body = { ...req.body, jwt: req.body.jwt };
    return next();
  } else {
    return res.status(400).send({ error: "Invalid refresh token" });
  }
};

export const validJWTNeeded = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authorization = req.headers["authorization"]?.split(" ");
  if (authorization && authorization[0] === "Bearer") {
    try {
      req.body.jwt = jwt.verify(authorization[1], secret);
      return next();
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
