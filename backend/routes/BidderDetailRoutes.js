const express = require('express');

const router = express.Router();

const BidderController = require('../controllers/BidderDetailController');

router.post('/',BidderController.create_bid);

router.get('/', BidderController.get_bid);

router.delete('/:_id', BidderController.delete_bid);

router.put('/:_id', BidderController.put_bid);

module.exports = router;