import express from 'express';
import Poll from '../models/pollModel.js';
import PollResponse from '../models/MCQresponce.js';

export const allpollres= async (req, res) => {
    const {pollId}=req.params;
    try {
      const polls = await PollResponse.find({ pollId:pollId });
      res.json(polls);
    } catch (error) {
      console.error('Error fetching user polls:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const Mcqresponce = async (req, res) => {
  const { pollId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid response data' });
  }

  for (const answer of answers) {
    if (!answer.questionId || !answer.answerId || !answer.answerText) {
      return res.status(400).json({ message: 'Each answer must have questionId, answerId, and answerText.' });
    }
  }

  try {
    const response = new PollResponse({
      pollId,
      userId: req.user.id,
      answers,
    });

    await response.save();
    res.json(response);
  } catch (e) {
    console.error('Error saving response:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

