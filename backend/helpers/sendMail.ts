import * as nodemailer from 'nodemailer'

import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_DOMAIN,
            pass: process.env.USER_PASS
        },
    });


export const sendMail = async(usermail: string, message: string) => {
    const payload = await transporter.sendMail({
        from : ' "Your-Auction" <verify@yourauction.com>',
        to: usermail,
        subject: "Verify Your Mail",
        text: message,
        html: "<b>Your Auction </b>"
    })

    console.log(`Message sent ${payload}`)
} 