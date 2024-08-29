const {Router}=require('express')
const auth = require('../middleware/auth')
const pollModel = require('../models/pollModel')
const pollRouter=Router()
pollRouter.use(auth)
pollRouter.post('/',async(req,res)=>{
    const {question, options }=req.body
    try{
        if (!question || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: 'Question and at least two options are required' });
        }
        const poll = await pollModel.create({
            question:question,
            options:options,
            user: req.user._id
        });
        return res.status(201).json({message:'Poll created successfully'})
    }catch(err){
        return res.status(500).json({ message: 'Internal server error' });
    }
})
pollRouter.get('/', async (req, res) => {
    try {
        const polls = await pollModel.find({ user: req.user._id }).populate('user', 'email');
        return res.status(200).send(polls);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
pollRouter.post('/response/:id', async (req, res) => {
    const { pollId, selectedOption } = req.body;
    try {
        if (!pollId || selectedOption === undefined) {
            return res.status(400).json({ message: 'Poll ID and selected option are required' });
        }

        const poll = await pollModel.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        const response = {
            user: req.user._id,
            selectedOption
        };

        poll.responses.push(response);
        await poll.save();

        return res.status(200).json({ message: 'Response submitted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports=pollRouter