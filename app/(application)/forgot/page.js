'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const forgotEmail = searchParams.get('email');
  const forgotToken = searchParams.get('token');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  console.log(forgotEmail);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])

  const sendResetEmail = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        sendMail: true
      })
    });

    const data = await response.json();
    if (data?.success) {
      alert('Password Reset Email has been Sent. Please Check your Email !');
      router.push('/');
    }
    else {
      console.log('Some Error Occured!');
    }

  }

  const resetPassword = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot?query=${forgotEmail}`);
    res = await res.json();
    if (res.success) {
      const tokenSaved = res.token;
      if (forgotToken !== tokenSaved) {
        alert('Token Mismatch. Sorry, Password cannot be Reset!');
        return;
      }
    }
    else {
      alert('Token not generated yet. Password cannot be reset!');
      return;
    }

    if (password === cpassword) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          password,
          sendMail: false
        })
      });

      const data = await response.json();
      if (data?.success) {
        alert('Your Password has been Changed Successfully!');
        router.push('/');
      }
      else {
        console.log('Error Occured!');
      }
    }
  }

  return (
    <div>
      <div className="w-full min-h-[72vh] bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-3 text-center text-4xl font-extrabold">CodesWear</h2>
          <h2 className="mb-12 text-center text-xl text-pink-600 font-bold">Forgot Password</h2>

          {forgotToken ?
            <>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="password">New Password</label>
                <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="cpassword">Confirm New Password</label>
                <input id="cpassword" type="password" name="cpassword" value={cpassword} onChange={e => setCpassword(e.target.value)} required className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>
              {password !== cpassword && <span className='text-red-600'>Passwords don't match</span>}

              <div className="mt-6">
                <button onClick={resetPassword} className="w-full inline-flex items-center justify-center px-4 py-2 bg-pink-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-pink-700 active:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200 disabled:opacity-25 transition">Continue</button>
              </div>
              {/* <div className="mt-6 text-center">
                <Link href="/login" className="underline font-semibold">Login to Your Account</Link>
              </div> */}
            </>
            :
            <>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="email">Email-Address</label>
                <input id="email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="py-2 px-3 border border-gray-300 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>

              <div className="mt-6">
                <button onClick={sendResetEmail} className="w-full inline-flex items-center justify-center px-4 py-2 bg-pink-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-pink-700 active:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200 disabled:opacity-25 transition">Continue</button>
              </div>
              <div className="mt-6 text-center">
                <Link href="/login" className="underline font-semibold">Login to Your Account</Link>
              </div>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default page
