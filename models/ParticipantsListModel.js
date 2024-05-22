import { Schema, model } from "mongoose";

const ParticipantListModel = new Schema(
  {
    list: [
      {
        participant: {
          type: Schema.Types.ObjectId,
          ref: "Participant",
          required: true,
        },
        registrationDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("ParticipantList", ParticipantListModel);
