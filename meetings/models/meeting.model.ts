import mongoose, { Model, Schema } from "mongoose";
import db from "../../common/services/mongoose.service";
import { IMeeting } from "../IMeeting";

const meetingSchema = new Schema<IMeeting>({
  title: { type: String, required: true },
  description: String,
  TimeZone: String,
  startTime: { type: Date, required: true },
  endTime: Date,
  location: String,
  attendeesIds: { type: [String], noDuplicates: true },
});

meetingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

meetingSchema.set("toJSON", {
  virtuals: true,
});

meetingSchema.methods.findById = function (id: string) {
  return this.model("Meeting").findById(id);
};

const Meeting = db.model("Meeting", meetingSchema);

export const createMeeting = async (meetingData: IMeeting) => {
  const meeting = new Meeting(meetingData);
  console.log("Created meeting with data: " + JSON.stringify(meetingData));
  return meeting.save();
};

export const findById = async (id: string) => {
  const result: any = await Meeting.findById(id);
  if (result) {
    delete result._id;
    delete result.__v;
    return result.toJSON();
  }
};

export const list = (perPage: number, page: number) => {
  return new Promise((resolve, reject) => {
    Meeting.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, meetings) {
        if (err) {
          reject(err);
        } else {
          resolve(meetings);
        }
      });
  });
};

export const patchMeeting = (
  id: string,
  meetingData: mongoose.UpdateQuery<IMeeting>
) => {
  return Meeting.findOneAndUpdate(
    {
      _id: id,
    },
    meetingData
  );
};

export const addAteendee = (id: string, attendeeId: string) => {
  return Meeting.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        attendeesIds: attendeeId,
      },
    }
  );
};

export const removeById = (meetingId: string) => {
  return new Promise((resolve, reject) => {
    Meeting.deleteMany({ _id: meetingId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

export const removeAllMeetingsBefore = (datestring: string) => {
  return Meeting.deleteMany({ startTime: { $lt: datestring } });
};
