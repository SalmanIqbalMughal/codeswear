'use client'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

import cartContext from '../../../components/CartContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {

  const contextValues = useContext(cartContext);
  const { user, setUser } = contextValues;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disabled, setDisabled] = useState(false)

  const router = useRouter();

  useEffect(() => {

    const runFunc = async () => {
      try {
        const tokenValue = localStorage.getItem('token');

        if (!tokenValue) {
          router.push('/');
        }

        else {
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

  const fetchUser = async (userEmail) => {
    // let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myUser`, {
    //   method: 'POST',
    //   body: JSON.stringify({ email: userEmail })
    // });

    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myUser?query=${userEmail}`);     // Using GET method.
    r = await r.json();

    if (r.Success) {
      setName(r.User.name);
      setAddress(r.User.address);
      setPincode(r.User.pincode);
      setPhone(r.User.phone);
    }

  }

  const handleUserSubmit = async () => {
    const data = { name, email, address, phone, pincode };
    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myUser`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    r = await r.json();
    // console.log(r);
    if (r.Success) {
      toast.success("Successfully Updated the User !", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }

  }

  const handlePasswordChange = async () => {
    const data = { email, password, npassword, cpassword };
    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/passwordChange`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    r = await r.json();
    // console.log(r);
    if (r.success) {
      toast.success("You have successfully Changed your Password !", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }

    else {
      toast.error(r.error, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }

    setPassword(''); setCpassword(''); setNpassword('');

  }

  const handleChange = (e) => {

    let value = e.target.value

    switch (e.target.name) {
      case 'name':
        setName(value)
        break;
      case 'password':
        setPassword(value)
        break;
      case 'npassword':
        setNpassword(value)
        break;
      case 'cpassword':
        setCpassword(value)
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

  return (
    <div className='container mx-auto my-9 min-h-screen'>
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
      <h1 className='text-3xl font-bold text-center'>My Account</h1>

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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (Immutable)</label>
            <input type="email" id="email" name="email" value={email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
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

      <button onClick={handleUserSubmit} disabled={disabled} className="m-2 mb-16 disabled:bg-pink-300 flex mr-auto items-center text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
        Submit</button>

      {/* <div className="mx-auto flex mt-2 mb-10">
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
      </div> */}

      <h2 className='font-semibold text-xl my-4'>2. Change Password</h2>

      <div className="mx-auto flex my-2">
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Old Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={password} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
            <input type="password" id="npassword" name="npassword" onChange={handleChange} value={npassword} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-3 w-1/2">
          <div className="mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
            <input type="password" id="cpassword" name="cpassword" onChange={handleChange} value={cpassword} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <button onClick={handlePasswordChange} disabled={disabled} className="m-2 mb-5 disabled:bg-pink-300 flex mr-auto items-center text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
        Submit</button>

    </div>
  )
}

export default Page