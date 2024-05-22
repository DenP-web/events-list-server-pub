import { Schema, model } from "mongoose";

const EventModel = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    participants: {
      type: Schema.Types.ObjectId,
      ref: "ParticipantList",
    },
  },
  {
    versionKey: false,
  }
);

export default model("Event", EventModel);
