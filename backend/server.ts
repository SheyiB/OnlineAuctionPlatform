import express from 'express';
import * as dotenv from "dotenv";
import {db} from './db';

dotenv.config();
db();


if (!process.env.PORT){
    console.log("Environmental Variables not found")
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.get('/*', (req, res)=>{
    res.send("Welcome To My Application")
})

app.listen('8080', ()=>{
    console.log(`Welcome to My Auction App`)
})