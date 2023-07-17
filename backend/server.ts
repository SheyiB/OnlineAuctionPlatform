//import Node packages
import express from 'express';
import * as dotenv from "dotenv";
import {db} from './db';
import cors from 'cors';
import morgan from 'morgan'

//import routes
import {authRouter} from './routes/auth.routes'
import {marketRouter} from './routes/market.routes'
import {auctionRouter} from './routes/auctions.routes'
import {bidRouter} from './routes/bids.routes'
import {auctioneerRouter} from './routes/auctioneer.routes'

//setup config
dotenv.config();

//instantiate Database
db();


if (!process.env.PORT){
    console.log("Environmental Variables not found")
    process.exit(1);
}


const PORT: number = parseInt(process.env.PORT as string, 10);


const app = express();


app.use(cors({credentials: true}));

app.use(express.json());

app.use(morgan('dev')); 

app.use('/auction-api/auth',authRouter)
app.use('/auction-api/market',marketRouter)
app.use('/auction-api/auction', auctionRouter)
app.use('/auction-api/bids', bidRouter)
app.use('/auction-api/auctioneer', auctioneerRouter)


app.get('/*', (req, res)=>{
    res.send("Welcome To My Application")
})

app.listen(PORT, ()=>{
    console.log(`Welcome to My Auction App`)
})