import mongoose from "mongoose";
import EventModel from "../models/EventModel.js";
import ParticipantsListModel from "../models/ParticipantsListModel.js";

const getAll = async ({ sortBy, page, limit }) => {
  limit = limit || 9;
  const offset = (page || 1) * limit - limit;

  let query = {};
  if (sortBy === "title") {
    query = { title: 1 };
  } else if (sortBy === "organizer") {
    query = { organizer: 1 };
  } else if (sortBy === "date") {
    query = { eventDate: 1 };
  }

  const allEvents = await EventModel.find()
    .sort(query)
    .limit(limit)
    .skip(offset);

  const totalCount = await EventModel.countDocuments();

  if (!allEvents.length) {
    throw new Error("No events found");
  }

  return { totalCount, events: allEvents };
};


const registrationsPerDay = async (eventId) => {
  const registrations = await ParticipantsListModel.aggregate([
    { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
    { $unwind: '$list' },
    {
      $group: {
        _id: {
          year: { $year: "$list.registrationDate" },
          month: { $month: "$list.registrationDate" },
          day: { $dayOfMonth: "$list.registrationDate" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);
  
  const formattedData = registrations.map((item) => ({
    date: `${item._id.year}-${item._id.month}-${item._id.day}`,
    count: item.count,
  }));

  return formattedData
};

export default {
  getAll,
  registrationsPerDay
};
