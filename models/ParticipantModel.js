import { Schema, model } from "mongoose";

const ParticipantModel = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    hearAbout: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Participant", ParticipantModel);
