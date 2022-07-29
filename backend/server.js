const express = require('express');
const mongoose = require('mongoose');

const AuctionRoute = require('./routes/AuctionDetailsRoutes');
const BidderRoute = require('./routes/BidderDetailRoutes');
const FlateSaleRout = require('./routes/FlateSaleRoute');
const TransactionHistoryRoute = require('./routes/transactionHistoryRoutes');
const UserDetailsRoute = require('./routes/UserDetailsRoutes');
const NFTDetailsRoute = require('./routes/nftDetailsRoutes');

const cors = require('cors');
const app = express();
app.use(express.json());
require('./model/db');

const port = 5000;

app.use(cors({
    origin: '*'
}));

app.use('/auctiondetails',AuctionRoute);
app.use('/bidderdetails', BidderRoute);
app.use('/flatesale', FlateSaleRout);
app.use('/transactionhistory',TransactionHistoryRoute);
app.use('/userdetails',UserDetailsRoute);
app.use('/nftdtails',NFTDetailsRoute);

console.log("server at port:",port);
app.listen(port);
