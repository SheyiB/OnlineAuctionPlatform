import { connect } from 'mongoose';

import * as dotenv from 'dotenv';


dotenv.config()

export const db = async() =>{
    console.log("About to connect")
    await connect(process.env.MONGODB_URI!).then(()=>{console.log('Database Successfully Connected!')});

    console.log(`Server Running on ${process.env.PORT}`)
}