// import ScalePoll from "../models/Scallpoll.js";

import { scaleresponce } from "../models/scaleresponcepoll.js";
import ScalePoll from "../models/Scallpoll.js";

// export const createScallPoll = async (req, res) => {
//   const { type, title, questions } = req.body;

//   if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
//     return res.status(400).json({ message: 'Invalid poll data' });
//   }

//   try {
//     const poll = new ScalePoll({
//       type,
//       title,
//       questions,
//       createdBy: req.user.id
//     });

//     await poll.save();
//     res.status(201).json(poll);
//   } catch (error) {
//     console.error('Error creating poll:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const createcreatescalepoll= async (req, res) => {
  
  console.log('Token received:', req.headers['authorization']); 
  try {
    const { type, title, questions } = req.body;

    const newPoll = new ScalePoll({
      type,
      title,
      createdBy: req.user.id,
      questions
    });

    const savedPoll = await newPoll.save();
    res.status(201).json(savedPoll);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const pollscaleresponce = async (req, res) => {

  const { pollId, answers } = req.body;

  if (!pollId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const poll = await ScalePoll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newResponse = new scaleresponce({
      pollId,
      // userID: req.user._id, // Use authenticated user ID
      answers
    });

    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    console.error('Error processing poll response:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const onescalepoll= async (req, res) => {
  try {
    const poll = await ScalePoll.findById(req.params.id);
    console.log(poll);
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const getScalePollResults = async (req, res) => {
  const { pollId } = req.params;
  console.log(pollId);

  try {
    const poll = await ScalePoll.findById(pollId);
    console.log(poll);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const responses = await scaleresponce.find({ pollId }).populate('userID', 'name email');
    console.log(responses);
    res.json({
      poll: {
        _id: poll._id,
        title: poll.title,
        questions: poll.questions,
      },
      responses,
    });
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};