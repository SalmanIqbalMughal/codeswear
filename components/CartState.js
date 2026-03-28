'use client'
import cartContext from "./CartContext";
import React, { useState } from 'react'

const CartState = (props) => {

    const [cart, setCart] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const [user, setUser] = useState({ value: null });
    const [key, setKey] = useState(0);

    const saveCart = (myCart) => {
        localStorage.setItem('cart', JSON.stringify(myCart));
        calcSubtotal(myCart);
    }

    const calcSubtotal = (myCart) => {
        let subt = 0;
        let itmCnt = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
            itmCnt += myCart[keys[i]].qty;
        }
        setItemCount(itmCnt);
        setSubtotal(subt);
    }

    const addToCart = (itemCode, qty, price, name, size, variant) => {
        let newCart = cart;
        if (itemCode in newCart) {
            newCart[itemCode].qty = newCart[itemCode].qty + qty;
        }
        else {
            newCart[itemCode] = { qty, price, name, size, variant }
        }
        setCart(newCart);
        saveCart(newCart);
    }

    const removeFromCart = (itemCode, qty) => {
        let newCart = cart;
        if (itemCode in newCart) {
            newCart[itemCode].qty = newCart[itemCode].qty - qty;
            if (newCart[itemCode]["qty"] <= 0) delete newCart[itemCode];
        }

        setCart(newCart);
        saveCart(newCart);
    }

    const buyOne = (itemCode, qty, price, name, size, variant) => {
        let newCart = {}
        newCart[itemCode] = { qty, price, name, size, variant };
        setCart(newCart)
        saveCart(newCart)
        // console.log(newCart);
    }

    const clearCart = () => {
        setCart({});
        saveCart({});
        console.log('Cart has been Cleared.');
    }

    return (
        <cartContext.Provider value={{ cart, setCart, itemCount, calcSubtotal, addToCart, removeFromCart, clearCart, subtotal, buyOne, user, setUser }}>
            {props.children}
        </cartContext.Provider>
    )
}

export default CartState
