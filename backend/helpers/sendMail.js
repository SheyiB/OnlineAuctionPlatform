//import * as nodemailer from 'nodemailer'

//import * as dotenv from "dotenv";

const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();



const transporter = nodemailer.createTransport(

    {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: true,
        auth: {
            user: process.env.USER_DOMAIN || '1f1a497ed789dc',
            pass: process.env.USER_PASSWORD || '4d76a1125a83e2'
        },
    });

    console.log('Configed', process.env.USER_DOMAIN, process.env.USER_PASSWORD)

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1f1a497ed789dc",
          pass: "4d76a1125a83e2"
        }
      });
//export const sendMail = async(usermail: string, message: string) => {
const sendMail = async(usermail, message) => {
    const payload = await transport.sendMail({
        from : ' "Your-Auction" <verify@yourauction.com>',
        to: usermail,
        subject: "Verify Your Mail",
        text: message,
        html: "<b>Your Auction </b>"
    })

    console.log(`Message sent ${payload}`)
} 



sendMail('elijahbanjo@gmail.com', 'Hello This is a test').catch(console.error);