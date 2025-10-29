const express = require('express');
const { getGames, getGameById, createGame, updateGame, deleteGame } = require('../controllers/gameController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/', protect, admin, createGame);
router.put('/:id', protect, admin, updateGame);
router.delete('/:id', protect, admin, deleteGame);

module.exports = router;
