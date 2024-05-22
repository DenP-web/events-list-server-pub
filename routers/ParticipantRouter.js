import {Router} from 'express';
import ParticipantController from '../controllers/ParticipantController.js';
import { registerValidation } from '../validations/index.js';
import handleValidErr from '../middleware/handleValidErr.js';

const participantRouter = new Router()

participantRouter.get('/:id', ParticipantController.getAll)
participantRouter.post('/:id', registerValidation, handleValidErr, ParticipantController.register)

export default participantRouter;

