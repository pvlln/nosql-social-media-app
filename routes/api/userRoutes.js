const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

// /api/users route
router.route('/').get(getUsers).post(createUser);

// /api/users/:id route
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/users/:id/friends
// router.route('/:userId/friends').post(addFriend);

// /api/users/:id/friends/:id
router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);

module.exports = router;