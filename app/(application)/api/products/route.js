import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/Connect";
import Product from "../../../../models/Product";

export async function GET() {

    connectDb();
    let products = await Product.find();
    let tshirts = {};

    // for (let item of products) {
    //     if (item.title in tshirts) {
    //         if (item.availableQty > 0 && !tshirts[item.title].color.includes(item.color)) {
    //             tshirts[item.title].color.push(item.color);
    //         }

    //         if (item.availableQty > 0 && !tshirts[item.title].size.includes(item.size)) {
    //             tshirts[item.title].size.push(item.size);
    //         }
    //     }

    //     else {
    //         tshirts[item.title] = JSON.parse(JSON.stringify(item));
    //         if (item.availableQty > 0) {
    //             tshirts[item.title].color = [item.color];
    //             tshirts[item.title].size = [item.size];
    //         }
    //     }
    // }

    return NextResponse.json({productsFormatted: tshirts, products: products});

}

export async function POST(req) {

    try {
        connectDb();
        const payload = await req.json();
        // console.log('Payload :', payload);

        // payload.forEach(async (element) => {
        let product = new Product(payload);
        await product.save();
        // });

        return NextResponse.json({ status: 'Added' });

    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 'Failed' });
    }
}

export async function PUT(req) {

    try {
        connectDb();
        const payload = await req.json();
        //console.log('Payload :', payload);

        payload.forEach(async (element) => {
            let product = await Product.findByIdAndUpdate(element._id, element);
        });

        return NextResponse.json({ status: 'Edited' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'Failed' });
    }
}
