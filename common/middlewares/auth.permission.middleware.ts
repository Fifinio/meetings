import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.config";
const ADMIN_PERMISSION = config["permissionLevels"]["ADMIN"];

export const minimumPermissionLevelRequired = (
  required_permission_level: number
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let user_permission_level = parseInt(req.body.jwt.permissionLevel);
    let userId = req.body.jwt.userId;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send(`Permission denied`);
    }
  };
};

export const onlySameUserOrAdminCanDoThisAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user_permission_level = parseInt(req.body.jwt.permissionLevel);
  let userId = req.body.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res
        .status(403)
        .send({ error: `Only the user with id ${userId} can do this action` });
    }
  }
};

export const sameUserCantDoThisAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userId = req.body.jwt.userId;
  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send({
      error: `Only the same user with id different than ${userId} can do this action`,
    });
  }
};
