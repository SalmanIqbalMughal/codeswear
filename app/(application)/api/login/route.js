import connectDb from "../../../../middleware/Connect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

export async function POST(req) {

    try {
        connectDb();
        const payload = await req.json();
        //console.log('Payload :', payload);

        let user = await User.findOne({ "email": payload.email });

        if (user) {

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);

            if (user.email == payload.email && decryptedPassword == payload.password) {
                var token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
                return NextResponse.json({ success: true, token });
            }
            else {
                return NextResponse.json({ success: false, error: "Invalid Credentials !" });
            }
        }
        else {
            return NextResponse.json({ success: false, error: "Invalid User !" });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error });
    }
}