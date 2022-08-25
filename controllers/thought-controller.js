const User = require('../models/User');
const Thought = require('../models/Thought');

const getAllThoughts = async (req, res) => {
    try {
        const data = await Thought.find({});
        res.json(data);
    } catch (err) {
        console.log("err", err);
        res.status(500).json(err);
    }
}

const createThought = async (req, res) => {
    try {
        const data = await Thought.create(req.body);
        if (data) {
            console.log("data", data._id, req.body.userId);
            const data1 = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: data._id } },
                { new: true }
            );
            res.json(data1);

            return;
        }
        res.status(404).json({ message: 'Failed to add thought' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const getThoughtById = async (req, res) => {
    try {
        const data = await Thought.findOne({ _id: req.params.id })
        if (!data) {
            res.status(404).json({ message: 'Cannot find Thought' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateThought = async (req, res) => {
    try {
        const data = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (!data) {
            res.status(404).json({ message: 'Cannot find Thought' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteThought = async (req, res) => {
    try {
        const data = await Thought.findOneAndDelete({ _id: req.params.id })
        if (!data) {
            res.status(404).json({ message: 'Cannot find Thought' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const addReaction = async (req, res) => {
    try {
        const data = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        if (!data) {
            res.status(404).json({ message: 'Cannot find Thought' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const data = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        if (!data) {
            res.status(404).json({ message: 'Cannot find Thought' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction };