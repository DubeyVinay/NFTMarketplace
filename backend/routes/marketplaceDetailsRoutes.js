const express = require('express');

const router = express.Router();

const MarketplaceController = require('../controllers/marketplaceDetailsController');

router.post('/', MarketplaceController.create_post);

router.get('/', MarketplaceController.get_posts);
router.get('/:_id', MarketplaceController.get_post);

router.delete('/:_id', MarketplaceController.delete_post);
router.put('/:_id', MarketplaceController.put_post);

module.exports = router;
