import * as MeetingModel from "../models/meeting.model";
import { Request, Response } from "express";
import * as UserModel from "../../users/models/users.model";

export const insert = (req: Request, res: Response) => {
  if (!req.body.title || !req.body.date || !req.body.startTime) {
    return res.status(400).send("Missing required fields");
  }
  if (!req.body.attendeesIds) req.body.attendeesIds = [req.body.jwt.userId]; //default to the user that created the meeting

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

export const addAteendee = (req: Request, res: Response) => {
  if (!req.body.userId) return res.status(400).send("Missing required fields");
  MeetingModel.addAteendee(req.params.meetingId, req.body.userId).then(
    (result) => {
      res.status(204).send({});
    }
  );
};

export const removeById = (req: Request, res: Response) => {
  MeetingModel.removeById(req.params.userId).then((result) => {
    res.status(204).send({});
  });
};

// remove all records from the database that have a startTime that is before the current time + 7 days
export const cleanUpDatabase = async (req: Request, res: Response) => {
  await MeetingModel.removeAllMeetingsBefore(new Date().toISOString());
  res.status(204).send({});
};
