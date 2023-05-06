import { connect } from 'mongoose';

export const db = async() =>{
    await connect('mongodb://127.0.0.1:27017/AuctionApp');

    console.log(`Server Running on ${process.env.PORT}`)
}