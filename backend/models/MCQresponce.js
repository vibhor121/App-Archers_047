
import mongoose from 'mongoose';

const { Schema } = mongoose;

const responseSchema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
      questionText: { type: String, required: true },
      answerId: [{ type: Schema.Types.ObjectId, ref: 'Option', required: true }],
      answerText: [{ type: String, required: true }],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const PollResponse = mongoose.model('PollResponse', responseSchema);

export default PollResponse;
