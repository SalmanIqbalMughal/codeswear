import connectDb from "@/middleware/Connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require('crypto-js');

export async function POST(req) {

    try {
        connectDb();
        const payload = await req.json();
        //console.log('Payload :', payload);
        const { name, email } = payload;

        //payload.forEach(async (element) => {
        let user = new User({ name, email, password: CryptoJS.AES.encrypt(payload.password, process.env.AES_SECRET).toString() });
        await user.save();
        //});

        return NextResponse.json({ Status: 'Success' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ Status: 'Failure' });
    }
}