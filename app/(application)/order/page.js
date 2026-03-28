import React from 'react'
import connectDb from "../../../middleware/Connect";
import Order from "../../../models/Order";

const OrderPage = async ({ searchParams }) => {

  const { id } = searchParams;
  let products, orderDate;
  const order = await getData(id);
  if (order) {
    products = order.products;
    orderDate = new Date(order.createdAt);
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
              {order && <>
                <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
                <p>Your Order has been Successfully Placed ! </p>
                <p>Order Placed On: {orderDate.toLocaleDateString('en-GB')} ! </p>
                {/* .toLocaleDateString('en-IN') */}
                <p className="leading-relaxed mb-4">Your Payment Status is: '<span className='font-semibold text-slate-700'>{order.status}</span>'.</p>

                <div className="flex mb-2 mt-6">
                  <a className="flex-grow font-semibold pt-1 px-1 w-2/3">Item Description</a>
                  <a className="flex-grow text-center font-semibold pt-1 px-1 w-1/6">Quantity</a>
                  <a className="flex-grow text-right font-semibold pt-1 px-1 w-1/6">Item Total</a>
                </div>

                {products && Object.keys(products).map((slug, index) => (
                  <div key={index} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500 w-2/3">{products[slug].name} - ({products[slug].size}/{products[slug].variant})</span>
                    <span className="ml-auto text-gray-900 w-1/6 text-center pr-2">{products[slug].qty}</span>
                    <span className="ml-auto text-gray-900 w-1/6 text-right pr-2">${products[slug].price} X {products[slug].qty} = ${products[slug].price * products[slug].qty}</span>
                  </div>))}

                <div className="flex mt-7">
                  <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ${order.amount}</span>
                  <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                </div>
              </>
              }
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/img/online-orders.png" />
          </div>
        </div>
      </section>

    </div>
  )
}

async function getData(orderId) {

  connectDb();
  const order = await Order.findById(orderId);

  return order;

}

export default OrderPage
