const express = require('express');

const router = express.Router();

const MarketplaceController = require('../controllers/marketplaceDetailsController');

router.post('/', MarketplaceController.create_post);

router.get('/', MarketplaceController.getNfts);
router.get('/usernfts/', MarketplaceController.getUserNfts);

router.get('/:_id', MarketplaceController.getNft);

router.delete('/:_id', MarketplaceController.delete_post);
router.put('/:_id', MarketplaceController.put_post);
router.put('/', MarketplaceController.put_post);

module.exports = router;
