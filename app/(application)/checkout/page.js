'use client'
import Link from 'next/link'
import cartContext from '../../../components/CartContext'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {

  const contextValues = useContext(cartContext);
  const { cart, setCart, addToCart, removeFromCart, clearCart, subtotal, user, setUser } = contextValues;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disabled, setDisabled] = useState(true)
  //const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const runFunc = async () => {
      try {
        const tokenValue = localStorage.getItem('token');
        // console.log(tokenValue);

        if (tokenValue) {

          let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders?query=${tokenValue}`);

          res = await res.json();
          setEmail(res.email);
          fetchUser(res.email);
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    runFunc();

  }, [])

  useEffect(() => {
    if (name && email && address && phone && pincode && subtotal > 0) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }

  }, [name, email, address, phone, pincode, subtotal])

  const fetchUser = async (userEmail) => {

    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myUser?query=${userEmail}`);     // Using GET method.
    r = await r.json();

    if (r.Success) {

      setName(r.User.name);
      setAddress(r.User.address);
      setPincode(r.User.pincode);
      usePincode(r.User.pincode)
      setPhone(r.User.phone);
    }

  }

  const handleChange = (e) => {

    let value = e.target.value

    switch (e.target.name) {
      case 'name':
        setName(value)
        break;
      case 'email':
        setEmail(value)
        break;
      case 'address':
        setAddress(value)
        break;
      case 'phone':
        setPhone(value)
        break;
      case 'pincode':
        setPincode(value);
        if (value.length > 4) {
          usePincode(value)
        }
        else {
          setState('');
          setCity('');
        };
        break;

      default:
        break;
    }

    // if (name && email && address && phone && pincode && value && subtotal > 0) {
    //   setDisabled(false)
    // }
    // else {
    //   setDisabled(true)
    // }

  }

  const usePincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    pins = await pins.json();

    if (Object.keys(pins).includes(pin)) {
      setCity(pins[pin][0]);
      setState(pins[pin][1]);
    }
    else {
      setState('');
      setCity('');
    }
  }

  const initiatePayment = async () => {

    let oId = Math.floor(Math.random() * Date.now());

    const data = { cart, subtotal, oId, name, email, address, phone, pincode }

    try {

      let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      r = await r.json();
      // console.log(r.order);

      if (r.success == true) {

        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setPincode('');
        setState('');
        setCity('');
        setDisabled(true);

        clearCart();
        router.push(`/order?id=${r.order._id}`);

        // let txnToken = r.txtToken;

        // var config = {
        //   "root": "",
        //   "flow": "DEFAULT",
        //   "data": {
        //     "orderId": oId, /* update order id */
        //     "token": txnToken, /* update token value */
        //     "tokenType": "TXN_TOKEN",
        //     "amount": subtotal /* update amount */
        //   },
        //   "handler": {
        //     "notifyMerchant": function (eventName, data) {
        //       console.log("notifyMerchant handler function called");
        //       console.log("eventName => ", eventName);
        //       console.log("data => ", data);
        //     }
        //   }
        // };

        // // initialze configuration using init method
        // window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        //   // after successfully updating configuration, invoke JS Checkout
        //   window.Paytm.CheckoutJS.invoke();
        // }).catch(function onError(error) {
        //   console.log("error => ", error);
        // });
      }

      else {
        // console.error(r.Error);
        toast.error(r.Error, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        if (r.clrCart) {
          clearCart();
        }
        setName('');
        if (!user.value) setEmail('');
        setAddress('');
        setPhone('');
        setPincode('');
        setState('');
        setCity('');
        setDisabled(true);
      }

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='container m-auto min-h-screen'>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} /> */}
      <h1 className='font-bold text-3xl my-7 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl mb-4'>1. Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} value={name} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            {user.value ? <input type="email" id="email" name="email" value={email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> :
              <input type="email" id="email" name="email" onChange={handleChange} value={email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            }
          </div>
        </div>
      </div>
      <div className="px-3 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" name="address" onChange={handleChange} value={address} rows={2} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" onChange={handleChange} value={phone} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PIN Code</label>
            <input type="text" id="pincode" name="pincode" onChange={handleChange} value={pincode} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex mt-2 mb-10">
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" value={state} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
            <input type="text" id="city" name="city" value={city} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl mb-4'>2. Review Cart Items & Pay</h2>
      <div className="sideCart bg-pink-100 px-12 py-5 m-2">
        <ol className='list-decimal font-semibold'>
          {
            Object.keys(cart).length == 0 && <div className="my-3 ps-3">No Items in the Cart !</div>
          }
          {Object.keys(cart).map((k) => {
            return (<li key={k}>
              <div className="item flex my-3">
                <div className='p-2'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='w-1/3 flex items-center justify-center'>
                  <AiFillMinusCircle className='cursor-pointer text-pink-600 text-lg'
                    onClick={() => { removeFromCart(k, 1) }} />
                  <span className='mx-2'>{cart[k].qty}</span>
                  <AiFillPlusCircle className='cursor-pointer text-pink-600 text-lg'
                    onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}
                  />
                </div>
              </div>
            </li>)
          })
          }

          {/* <li>
              <div className="item flex my-5">
                <div className='w-2/3 p-2'>Tshirts - Wear the Code</div>
                <div className='w-1/3 flex items-center justify-center'>
                  <AiFillMinusCircle className='cursor-pointer text-pink-600 text-lg' />
                  <span className='mx-2'>10</span>
                  <AiFillPlusCircle className='cursor-pointer text-pink-600 text-lg' />
                </div>
              </div>
            </li> */}

        </ol>

        <span className="font-bold">Subtotal: ${subtotal}</span>
      </div>

      <div className="mx-2 mb-4">
        <Link href={'/checkout'}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-pink-300 flex mr-auto items-center text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
          <BsFillBagCheckFill className='m-1' />Pay ${subtotal}</button></Link>
      </div>

    </div>
  )
}

export default Checkout
