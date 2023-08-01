import { connect } from 'mongoose';

export const db = async() =>{
    console.log("About to connect")
    await connect('mongodb://127.0.0.1:27017/AuctionApp');

    console.log(`Server Running on ${process.env.PORT}`)
}