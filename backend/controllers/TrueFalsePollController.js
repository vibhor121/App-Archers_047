import TrueFalsePoll from '../models/TrueFalsePoll.js';
import TrueFalseResponse from '../models/TrueFalseResponse.js';
import { io } from '../server.js';
export const createTrueFalsePoll = async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Invalid poll data. Poll must have at least one question.' });
  }

  try {
    const poll = new TrueFalsePoll({
      title,
      questions: questions.map((q) => ({ question: q.question })),
      createdBy: req.user.id,
    });

    await poll.save();
    res.json(poll);
  } catch (e) {
    console.error('Error creating poll:', e);
    res.status(500).json({ msg: 'Server error', error: e.message });
  }
};

export const submitTrueFalseResponse = async (req, res) => {
  const { pollId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid response data' });
  }

  try {
    const response = new TrueFalseResponse({
      pollId,
      userId: req.user.id,
      answers,
    });

    await response.save();

    // socket io
    io.emit(`poll-results-${pollId}`, response);


    res.json(response);
  } catch (e) {
    console.error('Error saving response:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

export const getAllTrueFalsePolls = async (req, res) => {
  try {
    const polls = await TrueFalsePoll.find({ createdBy: req.user.id });
    console.log("huhf",polls);
    res.json(polls);
  } catch (error) {
    console.error('Error fetching user polls:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTrueFalsePollById = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await TrueFalsePoll.findById(pollId);
    res.json(poll);
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTrueFalsePollResults = async (req, res) => {
  const { pollId } = req.params;

  try {
    const responses = await TrueFalseResponse.find({ pollId });
    res.json(responses);
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
