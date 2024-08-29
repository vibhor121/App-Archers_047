
const { Schema, model } = require('mongoose');
const mongoose=require('mongoose')
const quizSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
        questionText: { type: String, required: true }, // The question itself
        options: [{ type: String, required: true }], // Array of possible options
        correctAnswer: { type: Number, required: true }, // Index of the correct option
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'pollingUser', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now },
});

const quizModel = model('Quiz', quizSchema);
module.exports = quizModel;
