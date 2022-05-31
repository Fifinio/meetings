import express from "express";
import * as AuthorizationRouter from "./authorization/routes.config";
import * as UsersRouter from "./users/routes.config";
import * as MeetingsRouter from "./meetings/routes.config";
import { config } from "./common/config/env.config";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
MeetingsRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening on port", config.port);
});
