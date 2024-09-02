import mongoose from 'mongoose';

const { Schema } = mongoose;

const responseSchema = new Schema({

  pollId: { type: Schema.Types.ObjectId, ref: 'TrueFalsePoll', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId,required: true },
      questionText:{type:String , required:true},
      answer: { type: Boolean, required: true },

    },
  ],
  createdAt: { type: Date, default: Date.now },
  
});

const TrueFalseResponse = mongoose.model('TrueFalseResponse', responseSchema);

export default TrueFalseResponse;
