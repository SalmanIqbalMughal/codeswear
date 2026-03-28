import { rejects } from 'assert';
import { NextResponse } from 'next/server';
import { resolve } from 'path';
import connectDb from "../../../../middleware/Connect";
import Order from "../../../../models/Order";
import Product from '../../../../models/Product';
import pinCodes from '../../../../pincodes.json'

const https = require('https');

/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('paytmchecksum');

export async function POST(req) {

    var paytmParams = {};
    const payload = await req.json();

    // console.log(payload);

    if (payload.subtotal <= 0) {
        return NextResponse.json({ success: false, Error: "Cart is Empty. Please build your Cart First !", clrCart: false })
    }

    // Check if the Pincode is serviceable.
    if (!Object.keys(pinCodes).includes(payload.pincode)) {
        return NextResponse.json({ success: false, Error: "The Pincode you have entered is Not Serviceable !", clrCart: false })
    }

    // Check if the Cart is tampered.

    connectDb();

    let product, sumTotal = 0;
    let cart = payload.cart;

    for (let item in cart) {
        sumTotal += cart[item].price * cart[item].qty;
        product = await Product.findOne({ slug: item });    // checking in the database
        // console.log('Product :-', product);

        //  Check if the Cart Items are Out of Stock.
        if (product.availableQty < cart[item].qty) {
            return NextResponse.json({ success: false, Error: "Some Items in your Cart went Out of Stock.", clrCart: true })
        }

        if (product.price !== cart[item].price) {
            return NextResponse.json({ success: false, Error: "The price of some item in your Cart has been Changed.", clrCart: true })
        }
    }

    if (sumTotal !== payload.subtotal) {
        return NextResponse.json({ success: false, Error: "The prices of some items in your Cart have been Changed.", clrCart: true })
    }

    // Check if the details are valid.

    if (payload.phone.length < 10 || isNaN(payload.phone)) {
        return NextResponse.json({ success: false, Error: "Please Enter your 10-digits Phone Number!", clrCart: false })
    }

    if (payload.pincode.length < 5 || !Number.isInteger(Number(payload.pincode))) {
        return NextResponse.json({ success: false, Error: "Please Enter at-least 5-digits Pin Code!", clrCart: false })
    }

    // Insert an Entry in the Orders table with Status as 'pending'.

    let order = new Order({
        email: payload.email,
        orderId: payload.oId,
        paymentInfo: 'PayTM',
        products: payload.cart,
        name: payload.name,
        address: payload.address,
        pincode: payload.pincode,
        phone: payload.phone,
        amount: payload.subtotal,
        status: 'Paid'
    });

    await order.save();

    let products = order.products;
    for (let slug in products) {
        await Product.findOneAndUpdate({ slug: slug }, { $inc: { 'availableQty': - products[slug].qty } })
    }

    return NextResponse.json({ success: true, order: order });

    paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        "websiteName": "YOUR_WEBSITE_NAME",
        "orderId": payload.oId,
        "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        "txnAmount": {
            "value": payload.subtotal,
            "currency": "INR",
        },
        "userInfo": {
            "custId": payload.email,
        },
    };
 
    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    // PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY).then(async function (checksum) {

    //     paytmParams.head = {
    //         "signature": checksum
    //     };

    //     var post_data = JSON.stringify(paytmParams);

    //     const requestAsync = () => {
    //         return new Promise((resolve, reject) => {

    //             var options = {
    //                 /* for Staging */
    //                 // hostname: 'securegw-stage.paytm.in',

    //                 /* for Production */
    //                 hostname: 'securegw.paytm.in',

    //                 port: 443,
    //                 path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${payload.oId}`,
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Content-Length': post_data.length
    //                 }
    //             };

    //             var response = "";
    //             var post_req = https.request(options, function (post_res) {
    //                 post_res.on('data', function (chunk) {
    //                     response += chunk;
    //                 });

    //                 post_res.on('end', function () {
    //                     console.log('Response: ', response);
    //                     let ress = JSON.parse(response).body;
    //                     ress.success = true;
    //                     ress.clrCart = true;
    //                     resolve(ress);
    //                 });
    //             });

    //             post_req.write(post_data);
    //             post_req.end();
    //         });
    //     }

    //     let myr = await requestAsync();
    //     return NextResponse.json({ myr });

    // });

}