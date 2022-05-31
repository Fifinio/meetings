import * as MeetingModel from "../models/meeting.model";
import { Request, Response } from "express";

export const insert = (req: Request, res: Response) => {
  console.log("got to the controller - insert");
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  MeetingModel.createMeeting(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

export const list = (req: Request, res: Response) => {
  let limit =
    req.query.limit?.toString() && parseInt(req.query.limit.toString()) <= 100
      ? parseInt(req.query.limit.toString())
      : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      page = Number.isInteger(req.query.page.toString())
        ? parseInt(req.query.page.toString())
        : 0;
    }
  }
  MeetingModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

export const getById = (req: Request, res: Response) => {
  MeetingModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};
export const patchById = (req: Request, res: Response) => {
  MeetingModel.patchMeeting(req.params.meetingId, req.body).then((result) => {
    res.status(204).send({});
  });
};

export const removeById = (req: Request, res: Response) => {
  MeetingModel.removeById(req.params.userId).then((result) => {
    res.status(204).send({});
  });
};
