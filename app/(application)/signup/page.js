'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Signup = () => {

  const ref = useRef();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    res = await res.json();
    console.log(res);

    if (res.Status == "Success") {
      toast.success('🦄 Your Account has been Created Successfully !', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setName(''); setEmail(''); setPassword('');
      ref.current.focus()
    }
    else {
      toast.error('🦄 Sorry, Your Account could NOT be Created !', {
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
      case 'name':
        setName(e.target.value)
        break;
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
              <label className="block mb-1" htmlFor="name">Enter Name</label>
              <input ref={ref} name="name" type="text" value={name} onChange={handleChange} className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">Email-Address</label>
              <input name="email" type="email" value={email} onChange={handleChange} className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">Password</label>
              <input name="password" type="password" value={password} onChange={handleChange} className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required />
            </div>
            <div className="mt-6">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-pink-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-pink-700 active:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200 disabled:opacity-25 transition">Sign Up</button>
            </div>
            <div className="mt-6 text-center">
              <Link href="/login" className="underline font-semibold">Sign in to your account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
