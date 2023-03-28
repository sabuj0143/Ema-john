import React from 'react'
import './Cart.css'

const Cart = ({cart}) => {
    // const  cart = props.cart;
    // const {cart} = props;

    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
   
    for(const product of cart){
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }
    const tax = totalPrice * 7 / 100 ;

    let grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h2 className='sub-title'>Order Summary </h2>
            <hr></hr>
            <p>Selected Items :{cart.length}</p>
            <p>Total Price : ${totalPrice}</p>
            <p>Total Shipping Charge : ${totalShipping}</p>
            <p>Tax : ${tax.toFixed(2)}</p>
            <p>Grand Total : ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;