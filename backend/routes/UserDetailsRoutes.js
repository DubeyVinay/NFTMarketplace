const express = require('express');
const router = express.Router();

const UserDetailsController = require('../controllers/UserDetailsController');

router.post('/', UserDetailsController.create_user_details);
router.get('/', UserDetailsController.get_user_details);
router.delete('/:_id', UserDetailsController.delete_user_details);
router.put('/:_id', UserDetailsController.update_user_details);

module.exports = router;