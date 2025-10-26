const express = require('express');
const profileController = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/', protect, profileController.getProfile);
router.put('/', protect, profileController.updateProfile);

module.exports = router;