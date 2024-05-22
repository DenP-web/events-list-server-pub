
import EventServices from "../services/EventServices.js";

const getAll = async (req, res) => {
  try {
    let params = req.query
    const data = await EventServices.getAll(params)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};



const add = async (req, res) => {
  try {
    const arr = req.body;
    await EventServices.add(arr)
    return res.status(200).json({
      event: 'good'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const registrationsPerDay = async (req, res) => {
  try {
    const eventId = req.params.id;
    const regPerDay = await EventServices.registrationsPerDay(eventId)
    res.json(regPerDay);
  } catch (error) {
    console.error('Error fetching registration data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default {
  getAll,
  add,
  registrationsPerDay
};
