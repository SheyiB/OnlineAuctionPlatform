import * as nodemailer from 'nodemailer'

import * as dotenv from "dotenv";

dotenv.config();



var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1f1a497ed789dc",
          pass: "4d76a1125a83e2"
        }
      });
      
export const sendMail = async(usermail:string, message:string) => {
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