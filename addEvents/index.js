import fs from "fs/promises"; // Use the promises API of fs
import EventModel from "../models/EventModel.js";
import ParticipantsListModel from "../models/ParticipantsListModel.js";

const add = async (arr) => {
  for (const item of arr) {
    const participantList = new ParticipantsListModel();
    const event = new EventModel({
      title: item.title,
      description: item.description,
      eventDate: item.eventDate,
      organizer: item.organizer,
      participants: participantList._id,
    });

    participantList.eventId = event._id;

    await participantList.save();
    await event.save();
  }
};

export default async function addEvents() {
  try {
    const count = await EventModel.countDocuments();
    if (count === 0) {
      async function readJsonFile(filePath) {
        try {
          const data = await fs.readFile(filePath, "utf8");
          return JSON.parse(data);
        } catch (err) {
          console.error("Error reading or parsing file:", err);
          throw err; // Propagate the error
        }
      }

      const events = await readJsonFile("data.json"); // Wait for the file read to complete
      await add(events)
      console.log("Events have been added to the database");
    } else {
      console.log("Database already contains events");
    }
  } catch (error) {
    console.error("Error adding events:", error);
  }
}
