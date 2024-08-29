const {Schema,model}=require('mongoose')
const mongoose=require('mongoose')
const pollSchema = new Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'pollingUser', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now },
    responses: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'pollingUser' }, // Reference to the user who responded
        selectedOption: { type: Number } // Index of the selected option
    }]
});

const pollModel = model('Poll', pollSchema);
module.exports = pollModel;
