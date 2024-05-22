import { Types } from "mongoose";

import ParticipantsListModel from "../models/ParticipantsListModel.js";
import ParticipantModel from "../models/ParticipantModel.js";

const getAll = async ({ eventId, fullName, email }) => {
  let query = {};
  if (fullName) {
    query.fullName = { $regex: fullName, $options: "i" };
  }
  if (email) {
    query.email = { $regex: email, $options: "i" };
  }

  const list = await ParticipantsListModel.findOne({
    eventId: new Types.ObjectId(eventId),
  })

  if (!list) {
    throw new Error("Event not found");
  }

  const participants = await ParticipantModel.find({
    _id: { $in: list.list },
    ...query,
  });

  return { participants, totalCount: list.list.length, eventId };
};

const register = async (data) => {
  const participant = await ParticipantModel({
    fullName: data.fullName,
    email: data.email,
    dateOfBirth: data.dateOfBirth,
    hearAbout: data.hearAbout,
  });
  const saveParticipant = await participant.save();

  const event = await ParticipantsListModel.findOneAndUpdate(
    { eventId: new Types.ObjectId(data.eventId) },
    {
      $push: {
        list: {
          _id: saveParticipant._id,
        },
      },
    },
    { new: true }
  );
  if (!event) {
    throw new Error("Виникла помика при створенні");
  }
  return event;
};

export default {
  getAll,
  register,
};
