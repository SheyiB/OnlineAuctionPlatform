import express from 'express';

const app = express();

app.get('/*', (req, res)=>{
    res.send("Welcome To My Application")
})

app.listen('8080', ()=>{
    console.log(`Welcome to My Auction App`)
})