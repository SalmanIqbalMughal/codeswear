import connectDb from "@/middleware/Connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require('crypto-js');

export async function PUT(req) {

    try {
        connectDb();
        const payload = await req.json();

        let dbUser = await User.findOne({ email: payload.email });

        const { name, password } = dbUser;
        const decryptedPassword = CryptoJS.AES.decrypt(password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);

        if (payload.password === decryptedPassword) {

            if (payload.npassword === payload.cpassword) {
                // Now Change Your Password.
                await User.findOneAndUpdate({ email: dbUser.email }, { password: CryptoJS.AES.encrypt(payload.npassword, process.env.AES_SECRET).toString() });
                return NextResponse.json({ success: true, error: null });
            }
            else {
                return NextResponse.json({ success: false, error: 'Please Confirm your New Password.' });
            }

        }

        else {
            return NextResponse.json({ success: false, error: 'Please provide your correct Password.' });
        }
    }

    catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error });
    }

}