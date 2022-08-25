const express = require('express');
const router = express.Router();

const NFTDetailsController = require('../controllers/nftDetailsController');

router.post('/', NFTDetailsController.create_nft_details);
router.get('/', NFTDetailsController.get_nft_details);
router.get('/:sale_type', NFTDetailsController.get_nft_details);

router.delete('/:_id', NFTDetailsController.delete_nft_details);
// router.put('/:_id', NFTDetailsController.update_nft_details);

module.exports = router;