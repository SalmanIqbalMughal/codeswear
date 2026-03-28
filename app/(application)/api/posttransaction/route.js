import { NextResponse } from "next/server";
import connectDb from "@/middleware/Connect";
import Order from "@/models/Order";
import Product from "@/models/Product";
import PaytmChecksum from "paytmchecksum";
import { revalidatePath } from "next/cache";

export async function GET(req) {

   let order;
   const payload = await req.json();     // received from Paytm Server.

   // Validate Paytm Checksum by using our Merchant Key.
   var paytmChecksum = "";
   var paytmParams = {};

   const received_data = payload;
   for (var key in received_data) {
      if (key == 'CHECKSUMHASH') {
         paytmChecksum = received_data[key]
      }
      else {
         paytmParams[key] = received_data[key]
      }
   }

   var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
   if (!isValidChecksum) {
      return NextResponse.json({ success: false, Error: "Paytm Checksum Mis-Matched! Someone has tempered with your data." })
   }

   // Update Order's Status in the Orders Table after checking the Paytm Transaction Status.

   connectDb();

   if (payload.STATUS == 'TXN_SUCCESS') {
      order = await Order.findOneAndUpdate({ orderId: payload.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(payload), transactionId: payload.TXNID })
      let products = order.products;
      for (let slug in products) {
         await Product.findOneAndUpdate({ slug: slug }, { $inc: { 'availableQty': - products[slug].qty } })
      }
   }
   else if (payload.STATUS == 'PENDING') {
      order = await Order.findOneAndUpdate({ orderId: payload.ORDERID }, { status: 'Pending', paymentInfo: JSON.stringify(payload), transactionId: payload.TXNID })
   }

   // Initiate Shipping
   // Redirect user to the Order Confirmation Page.

   // return NextResponse.json({ body: payload })
   NextResponse.redirect('/order?cc=1&id=' + order._id);

}