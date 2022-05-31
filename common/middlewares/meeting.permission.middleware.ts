import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.config";
const ADMIN_PERMISSION = config["permissionLevels"]["ADMIN"];

export const onlyParticipantOrAdminCanDoThisAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user_permission_level = parseInt(req.body.jwt.permissionLevel);
  let userId = req.body.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId)
    return next();
  // if getMeetingById(req.params.meetingId).attendees.includes(userId) return next();
  if (user_permission_level & ADMIN_PERMISSION) return next();

  return res.status(403).send("You are not authorized to do this action");
};
