import ParticipantService from "../services/ParticipantService.js"

const getAll = async (req, res) => {
  try {
    const {id} = req.params
    const query = req.query
    const data = await ParticipantService.getAll({...query, eventId: id})
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(503).json({
      message: error.message
    })
  }
}

const register = async (req, res) => {
  try {
    let data = req.body
    const {id} = req.params
    const allEvents = await ParticipantService.register({...data, eventId: id})
    res.status(200).json({
      events: allEvents
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};


export default {
  getAll,
  register
}