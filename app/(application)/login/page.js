'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import cartContext from '../../../components/CartContext'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const contextValues = useContext(cartContext);
  const { user, setUser } = contextValues;
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    res = await res.json();
    // console.log(res);

    if (res.success) {
      localStorage.setItem('token', res.token);
      setUser({ value: res.token });
      toast.success('🦄 You have been Logged in Successfully !', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setEmail(''); setPassword('');
      setTimeout(() => {
        router.push('/')
      }, 1500);
    }
    else {
      toast.error(res.error, {
        position: "bottom-left",
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

  const handleChange = (e) => {

    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <div>
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
      <div className="w-full min-h-[72vh] bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-12 text-center text-4xl font-extrabold">CodesWear</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">Email-Address</label>
              <input id="email" type="email" name="email" value={email} onChange={handleChange} className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={password} onChange={handleChange} className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" type="checkbox" className="border border-gray-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
              </div>
              <Link href="/forgot" className="text-sm"> Forgot your password? </Link>
            </div>
            <div className="mt-6">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-pink-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-pink-700 active:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200 disabled:opacity-25 transition">Sign In</button>
            </div>
            <div className="mt-6 text-center">
              <Link href="/signup" className="underline font-semibold">Sign up for an account</Link>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Login
