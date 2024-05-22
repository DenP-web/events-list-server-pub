import {Router} from 'express';
import EventController from '../controllers/EventController.js';

const eventRouter = new Router()

eventRouter.post('/', EventController.add)
eventRouter.get('/', EventController.getAll)
eventRouter.get('/:id/reg-per-day', EventController.registrationsPerDay)

export default eventRouter;

