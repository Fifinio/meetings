import * as MeetingsController from "./controllers/meetings.controller";
import * as PermissionMiddleware from "../common/middlewares/auth.permission.middleware";
import * as ValidationMiddleware from "../common/middlewares/auth.validation.middleware";
import * as MeetingsMiddleware from "../common/middlewares/meetings.permission.middleware";
import { Express } from "express";
import { config } from "../common/config/env.config";

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

export const routesConfig = (app: Express) => {
  app.get("/meetings", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    MeetingsController.list,
  ]);
  app.get("/users/:meetingId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MeetingsController.getById,
  ]);
  app.patch("/meetings/:userid/:meetingId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MeetingsController.patchById,
  ]);
  app.delete("/meetings/:meetingId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    MeetingsController.removeById,
  ]);
};
