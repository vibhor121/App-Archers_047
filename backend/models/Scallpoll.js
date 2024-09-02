import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
  question: String,
  useSlider: { type: Boolean, default: true },
  options: [{ text: String }]
});

const pollSchema = new mongoose.Schema({
  type: String,
  title: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ScalePoll = mongoose.model('ScalePoll', pollSchema);
export default ScalePoll;
