'use client'
import Image from 'next/image'
import Link from 'next/link'
import cartContext from './CartContext'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { FaCartArrowDown } from 'react-icons/fa'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

  const refCart = useRef();
  const router = useRouter();
  const urlpath = usePathname();
  const [sidebar, setSidebar] = useState(false);
  const [dropState, setDropState] = useState(false);
  const contextValues = useContext(cartContext);
  const { user, setUser, cart, setCart, itemCount, calcSubtotal, addToCart, removeFromCart, clearCart, subtotal } = contextValues;

  const exemptedurls = ['/checkout', '/order', '/orders', '/myaccount', '/forgot', '/'];

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        calcSubtotal(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('cart');
    }

    const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token });
    }

    if (exemptedurls.includes(urlpath)) setSidebar(false);

  }, [urlpath])

  useEffect(() => {
    if (Object.keys(cart).length === 0) setSidebar(false); else setSidebar(true);
    // console.log(itemCount, subtotal);
    // console.log(urlpath);
    console.log(Object.keys(cart).length);

    if (exemptedurls.includes(urlpath)) setSidebar(false);

  }, [itemCount])

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (refCart.current.classList.contains('translate-x-full')) {
    //   refCart.current.classList.remove('translate-x-full');
    //   refCart.current.classList.add('translate-x-0')
    // }
    // else {
    //   refCart.current.classList.remove('translate-x-0');
    //   refCart.current.classList.add('translate-x-full')
    // }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ value: null });
    setDropState(false);
    toast.success('🦄 You have been Logged Out Successfully !', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

    setTimeout(() => {
      router.push('/')
    }, 1500);
  }

  // const toggleDropdown = () => {
  //   setDropState(!dropState);
  // }

  return (
    <div className='sticky top-0  bg-slate-100 z-30'>
      <ToastContainer
        position="top-left"
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
      <div className={`flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md ${!sidebar && 'overflow-hidden'}`}>

        <div className="logo mr-auto md:mx-5">
          <Link href={'/'}><Image src='/img/logo.png' alt='logo' width={170} height={30} /></Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-5 font-bold md:text-md">
            <Link href={'/tshirts'}><li className='hover:text-pink-700'>Tshirts</li></Link>
            <Link href={'/hoodies'}><li className='hover:text-pink-700'>Hoodies</li></Link>
            <Link href={'/stickers'}><li className='hover:text-pink-700'>Stickers</li></Link>
            <Link href={'/mugs'}><li className='hover:text-pink-700'>Mugs</li></Link>
          </ul>
        </div>

        <div className="cart cursor-pointer absolute right-5 top-4 md:text-3xl flex items-center">
          <div className="cursor-pointer" onMouseLeave={() => setDropState(false)}>
            {dropState && <div className="absolute right-8 top-6 bg-pink-50 border rounded-md px-6 w-36 shadow-lg font-semibold" onMouseOver={() => setDropState(true)}>
              <ul className='py-2'>
                <li className='py-1 hover:text-pink-700 text-sm'><Link href={'/myaccount'}>My Account</Link></li>
                <li className='py-1 hover:text-pink-700 text-sm'><Link href={'/orders'}>My Orders</Link></li>
                <li onClick={logout} className='py-1 hover:text-pink-700 text-sm'>Logout</li>
              </ul>
            </div>}

            {user.value ? <MdAccountCircle className='text-xl md:text-2xl mx-2' onMouseOver={() => setDropState(true)} /> :
              <Link href={'/login'}><button className='bg-pink-600 text-sm px-2 py-1 rounded-md text-white mx-2 align-top'>Login</button></Link>
            }
          </div>
          <FaCartArrowDown onClick={toggleCart} className='text-xl md:text-2xl' />
        </div>

        {/* ${Object.keys(cart).length === 0 ? 'translate-x-full' : 'translate-x-0'} 
        <div ref={refCart} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute right-0 top-0 bg-pink-100 px-7 py-10 
                                      transform transition-transform translate-x-full z-50`}> */}

        <div ref={refCart} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 bg-pink-100 px-7 py-10 
                                 ${sidebar ? 'right-0' : '-right-96'} transition-all z-50`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            {
              Object.keys(cart).length === 0 && <div className="my-3 ps-3">No Items in the Cart !</div>
            }
            {
              Object.keys(cart).map((k) => {
                return (<li key={k}>
                  <div className="item flex my-5">
                    <div className='w-2/3 p-2'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
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

          <div className="font-bold">Subtotal: ${subtotal}</div>
          <div className="flex my-8">
            <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mx-auto items-center text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className='m-1' />Checkout</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex mx-auto items-center text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm">
              Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar