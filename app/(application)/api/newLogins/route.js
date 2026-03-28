import connectDb from '../../../../middleware/Connect';
import Logins from '../../../../models/Logins';
import { NextResponse } from "next/server";
var CryptoJS = require('crypto-js');

export async function POST(req) {

    try {
        connectDb();
        const payload = await req.json();
        // console.log('LoginPayload :', payload);
        const { username, email, password, rights } = payload;

        let login = new Logins({ username, email, password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString(), rights });
        await login.save();

        return NextResponse.json({ Status: 'Success' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ Status: 'Failure' });
    }
}