import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
});

const pollSchema = new Schema({
  title: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  questions: { type: [questionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TrueFalsePoll = mongoose.model('TrueFalsePoll', pollSchema);

export default TrueFalsePoll;