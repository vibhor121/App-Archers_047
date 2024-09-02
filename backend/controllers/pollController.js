// import Poll from '../models/pollModel.js';
import Poll from '../models/pollModel.js';
import ScalePoll from '../models/Scallpoll.js';
import TrueFalsePoll from '../models/TrueFalsePoll.js';

export const createPoll = async (req, res) => {
  const { type, title, questions } = req.body;

  console.log('Received data:', req.body);
  console.log('Token received:', req.headers['authorization']); // Log the received token

  if (!title || !questions) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Invalid poll data. Poll must have at least one question.' });
  }

  for (const question of questions) {
      if (!question.question || !Array.isArray(question.options) || question.options.length === 0) {
          return res.status(400).json({ message: 'Each question must have text and at least one option.' });
      }
      // Validate question type
      if (!['radio', 'checkbox'].includes(question.type)) {
          return res.status(400).json({ message: 'Invalid question type. Must be either "radio" or "checkbox".' });
      }
  }

  try {
      const poll = new Poll({
          type,
          title,
          questions: questions.map((q) => ({
              question: q.question,
              type: q.type, // Include question type
              options: q.options.map(opt => ({ text: opt.text }))
          })),
          createdBy: req.user.id,
      });

      await poll.save();
      res.json(poll);
  } catch (e) {
      console.error('Error creating poll:', e); // Log the error details
      res.status(500).json({ msg: 'Server error', error: e.message });
  }
};

export const allpolls = async (req, res) => {
  console.log(req.user.id); // Debug: Check user ID
  try {
    const { type } = req.query; 
    const query = { createdBy: req.user.id };

    if (type) {
      query.type = type; 
    }

    // Fetching polls
    const polls = await Poll.find(query).populate('questions.options'); 
    const allPolls = await ScalePoll.find(query);
    const binarypoll=await TrueFalsePoll.find(query);
    // const po=await Poll.find();
    // const all=await ScalePoll.find();
    // console.log("poll",po);
    // console.log("all",all);
    console.log('Polls:', polls);
    console.log('Scale Polls:', allPolls);

    res.json({ polls, scalepolls: allPolls,binarypoll:binarypoll });
  } catch (error) {
    console.error('Error fetching user polls:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

  
export const onepoll= async (req, res) => {
   const { pollId } = req.params;

        console.log(pollId);
      try {
        const polls = await Poll.find({ _id: pollId });
        res.json(polls);
      } catch (error) {
        console.error('Error fetching user polls:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
  };
  
