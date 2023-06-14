const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts route
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id route
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:id/reactions/:id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;