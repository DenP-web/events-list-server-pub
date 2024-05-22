import { Router } from "express";

import eventRouter from "./EventRouter.js";
import participantRouter from "./ParticipantRouter.js";

const router = new Router();

router.use('/events', eventRouter)
router.use('/participant', participantRouter)

export default router