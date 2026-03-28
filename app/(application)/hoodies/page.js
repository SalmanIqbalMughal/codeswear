import Link from 'next/link'
import React from 'react'
import connectDb from '../../../middleware/Connect'
import Product from '../../../models/Product'

const Hoodies = async () => {
  const products = await getData();
  console.log(products);
  const colors = ['red', 'blue', 'black', 'yellow', 'green', 'purple', 'navy'];

  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center mx-5">
            {
              Object.keys(products).length === 0 && <p>Sorry all the hoodies are currently out of stock. New stock coming soon. Stay tuned!</p>
            }
            {products && Object.keys(products).map((item) => (<div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-6">
              <Link passHref={true} className="block relative h-72 rounded overflow-hidden cursor-pointer" href={`/product/${products[item].slug}`}>
                {/* <img alt="ecommerce" className="object-cover object-top w-full h-full block" src="/img/Tshirt-001.jpg" /> */}
                <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
              </Link>

              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">${products[item].price}</p>
                <div className="mt-2">
                  {products[item].size.map((sz) => (<span key={sz} className='border border-gray-400 px-1 mx-1'>{sz}</span>))}
                </div>
                <div className="mt-2">
                  {/* {products[item].color.map((clr) => (<button key={clr} className={`border-2 border-gray-300 ml-1 bg-${clr}-600 rounded-full w-6 h-6 focus:outline-none`}></button>))} */}

                  {products[item].color.includes('red') && <button className={`border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('black') && <button className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('white') && <button className={`border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('blue') && <button className={`border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('green') && <button className={`border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('yellow') && <button className={`border-2 border-gray-300 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('purple') && <button className={`border-2 border-gray-300 ml-1 bg-purple-600 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {products[item].color.includes('gray') && <button className={`border-2 border-gray-300 ml-1 bg-gray-600 rounded-full w-6 h-6 focus:outline-none`}></button>}

                </div>
              </div>
            </div>))
            }

          </div>
        </div>
      </section>
    </div>
  )
}

async function getData() {

  connectDb()
  const products = await Product.find({ category: 'hoodie' });

  let hoods = {};
  for (let item of products) {
    if (item.title in hoods) {
      if (item.availableQty > 0 && !hoods[item.title].color.includes(item.color)) {
        hoods[item.title].color.push(item.color);
      }

      if (item.availableQty > 0 && !hoods[item.title].size.includes(item.size)) {
        hoods[item.title].size.push(item.size);
      }
    }
    else {
      hoods[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoods[item.title].color = [item.color];
        hoods[item.title].size = [item.size];
      }
      else {
        hoods[item.title].color = [];
        hoods[item.title].size = [];
      }
    }
  }

  return hoods;

  // let products = await fetch("http://localhost:3000/api/products");

  // if (!products.ok) {
  //   throw new Error('Failed to Fetch Data');
  // }

  // return products.json();

}

export default Hoodies
