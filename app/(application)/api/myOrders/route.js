import connectDb from "../../../../middleware/Connect";
import Order from "../../../../models/Order";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

export async function GET(req) {
    // const searchParams = req.nextUrl.searchParams;
    // const token = searchParams.get('query');

    const token = req.nextUrl.searchParams.get("query");

    // console.log(req, token);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ email: data.email });
}

export async function POST(req) {
    const payload = await req.json();
    // console.log(payload);
    const data = jwt.verify(payload.token, process.env.JWT_SECRET);
    connectDb();
    const orders = await Order.find({ email: data.email });
    return NextResponse.json(orders);
}