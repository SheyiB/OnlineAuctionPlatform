//import Node packages
import express from 'express';
import * as dotenv from "dotenv";
import {db} from './db';

//import routes
import {authRouter} from './routes/auth.routes'
import {marketRouter} from './routes/market.routes'

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

app.use(express.json());

app.use('/auction-api/auth',authRouter)
app.use('/auction-api/market',marketRouter)

app.get('/*', (req, res)=>{
    res.send("Welcome To My Application")
})

app.listen(PORT, ()=>{
    console.log(`Welcome to My Auction App`)
})