import express from 'express';
// import protect from '../middlewares/auth.js';
import { createTrueFalsePoll, getAllTrueFalsePolls, getTrueFalsePollById, getTrueFalsePollResults, submitTrueFalseResponse } from '../controllers/TrueFalsePollController.js';
import { protect } from '../middlewares/auth.js';

const trueOrFalseRouter = express.Router();


trueOrFalseRouter.post('/true-false-poll', protect, createTrueFalsePoll);
trueOrFalseRouter.post('/true-false-poll/response/:pollId', protect, submitTrueFalseResponse);
trueOrFalseRouter.get('/true-false-poll', protect, getAllTrueFalsePolls);
trueOrFalseRouter.get('/true-false-poll/:pollId', protect, getTrueFalsePollById);
trueOrFalseRouter.get('/true-false-poll/results/:pollId', protect, getTrueFalsePollResults);

export default trueOrFalseRouter