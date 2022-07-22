const express = require('express');

const router = express.Router();

const TransactionHistory = require('../controllers/transactionHistoryController');

router.post('/', TransactionHistory.TransactionHistory);

router.get('/', TransactionHistory.TransactionHistory);
router.get('/:_id', TransactionHistory.get_TransactionHistory);

router.delete('/:_id', TransactionHistory.delete_TransactionHistory);
router.put('/:_id', TransactionHistory.update_TransactionHistory);

module.exports = router;
