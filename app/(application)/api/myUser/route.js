import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/Connect";
import User from "../../../../models/User";

export async function GET(req) {

    try {
        connectDb();
        const userEmail = req.nextUrl.searchParams.get("query");

        const dbUser = await User.findOne({ email: userEmail })
        const { name, email, address, pincode, phone } = dbUser;
        return NextResponse.json({ Success: true, User: { name, email, address, pincode, phone } });

    } catch (error) {
        console.error(error)
    }
}

export async function POST(req) {

    try {
        connectDb();
        const payload = await req.json();

        const dbUser = await User.findOne({ email: payload.email })
        const { name, email, address, pincode, phone } = dbUser;
        return NextResponse.json({ Status: 'Success', User: { name, email, address, pincode, phone } });

    } catch (error) {
        console.error(error)
    }
}

export async function PUT(req) {

    try {
        connectDb();
        const payload = await req.json();

        let dbUser = await User.findOneAndUpdate({ email: payload.email }, payload);
      
        const { name, email, address, pincode, phone } = dbUser;
        return NextResponse.json({ Success: true, User: { name, email, address, pincode, phone } });

    } catch (error) {
        console.error(error);
    }
}