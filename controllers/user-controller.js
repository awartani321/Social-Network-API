const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const data = await User.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createUser = async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserById = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id })
        if (!data) {
            res.status(404).json({ message: 'Cannot find User' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (!data) {
            res.status(404).json({ message: 'Cannot find User' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteUser = async (req, res) => {
    try {
        const data = await User.findOneAndDelete({ _id: req.params.id })
        if (!data) {
            res.status(404).json({ message: 'Cannot find User' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const addFriend = async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
        if (!data) {
            res.status(404).json({ message: 'Cannot find User Or Friend' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteFriend = async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        if (!data) {
            res.status(404).json({ message: 'Cannot find User Or Friend' });
            return;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, deleteFriend };