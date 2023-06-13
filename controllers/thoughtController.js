const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req,res){
        try {
            const allThoughts = await Thought.find().populate("reactions").populate("userId");
            res.json(allThoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET one thought
    async getSingleThought(req,res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate("reactions").populate("userId");
            if (!thought){
                return res.status(404).json({message:"Thought not found. Please try again."});
            };
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // POST new thought
    async createThought(req,res){
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: newThought._id}},
            );
            if (!user) {
                res.status(404).json({message:"User not found. Pleas try again."});
            };
            res.json(newThought);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // PUT to update thought
    async updateThought(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thought){
                res.status(404).json({message:"Thought not found."});
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // DELETE thought
    async deleteThought(req,res){
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if (!thought){
                res.status(404).json({message:"Thought not found. Please try a different ID."});
            }
            res.json({message:"Thought deleted!"})
        } catch (error) {
            res.status(500).json(error);
        }
    },
};