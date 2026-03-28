import connectDb from "@/middleware/Connect";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require('crypto-js');

export async function GET(req) {

    try {

        connectDb();
        const userEmail = req.nextUrl.searchParams.get("query");
        const forgotUser = await Forgot.findOne({ email: userEmail })

        if (forgotUser) {
            return NextResponse.json({ success: true, token: forgotUser.token })
        }
        else {
            return NextResponse.json({ success: false, token: null })
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, token: null })
    }

}

export async function POST(req) {

    try {
        // Check if the User exists in the database.
        const payload = await req.json();

        connectDb();
        const dbUser = await User.findOne({ email: payload.email })

        if (dbUser) {

            if (payload.sendMail) {
                // Send an Email to the user.

                let newToken = `lstksaghakriw28478237482874jshajfsklngklahwerj374387`;

                const forgotUser = await Forgot.findOne({ email: dbUser.email });

                if (!forgotUser) {

                    let forgot = new Forgot({
                        name: dbUser.name,
                        email: dbUser.email,
                        token: newToken
                    });

                    await forgot.save();
                }

                else {
                    await Forgot.findOneAndUpdate({ email: dbUser.email }, { token: newToken });
                }

                let email = `We have sent you this email in response to your request to reset your password on codeswear.com

                        <br/><br/>

                        To reset your password, please follow the link below:

                        <a href=https://codeswear.com/forgot?token=${newToken}&email=${dbUser.email}>Click here to reset your password</a>

                        <br/><br/>

                        We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to codeswear.com's My Account Page and using the Option No.2: "Change Password".

                        <br/><br/>`

                // Send this Email using any service of your choice.

                return NextResponse.json({ success: true });
            }

            else {
                // Reset the User Password.
                await User.findOneAndUpdate({ email: dbUser.email }, { password: CryptoJS.AES.encrypt(payload.password, process.env.AES_SECRET).toString() });
                return NextResponse.json({ success: true });
            }
        }

        return NextResponse.json({ success: false });

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false });
    }

}