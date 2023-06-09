const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');

// Export controller
module.exports = {
    // GET all users
    async getUsers(req,res){
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // GET a single user by id
    async getSingleUser(req,res){
        try {
            const user = await User.findOne({_id: req.params.id}).select('__v');
            // Select? Is thought and friend data populated?
            if (!user){
                return res.status(404).json({message: "No user found. Please try another ID."})
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // POST a new user
    async createUser(req,res){
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // PUT to update user
    async updateUser(req,res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!user){
                res.status(404).json({message: "No user found. Please try again with a different ID."});
            };
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // DELETE user
    async deleteUser(req,res){
        try {
            const user = await User.findOneAndDelete({id: req.params.userId});
            if (!user){
                res.status(404).json({message: "No user found. Please try again with a different ID."})
            };
            res.json({message: `The following user has been deleted: ${user}`});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // POST new friend
    async addFriend(req,res){
        try {
            const newFriend = await User.findOne({id: req.params.friendId});
            if (!newFriend){
                res.status(404).json({message:"Friend not found. Please try again with a different ID."})
            };
            const user = await User.findOneAndUpdate(
                {id: req.params.userId},
                {$addToSet: {friends: newFriend}},
                // Where are friendId and userId defined??- route??
                {runValidators:true, new: true}
            );
            if (!user){
                res.status(404).json({message: "No user found. Please try again with a different ID."})
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // DELETE friend
    async removeFriend(req,res){
        try {
            const friend = await User.findOne({id: req.params.friendId});
            if (!friend){
                res.status(404).json({message: "Friend not found. Please try again with a different ID."})
            };
            const user = await User.findOneAndUpdate(
                {id: req.params.userId},
                {$pull: {friend: {friendId: req.params.friendId}}},
                {runValidators: true, new: true}
            );
            if (!user){
                return res.status(404).json({message: "User not found. Please try again with a different ID."})
            };
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};