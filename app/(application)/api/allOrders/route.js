import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/Connect";
import Order from "../../../../models/Order";

export async function GET() {

    connectDb();
    let orders = await Order.find();

    return NextResponse.json({ orders: orders });

}