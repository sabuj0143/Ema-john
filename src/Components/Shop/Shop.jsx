import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const { totalProducts } = useLoaderData();

    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);


    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];
    console.log(totalProducts);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {

        const storedCart = getShoppingCart();
        const savedCart = [];


        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);

    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order
                                <FontAwesomeIcon className='btn-checkout-icon' icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>

            </div>
            {/* pagination */}
            <div className='pagination-container'>
                {
                    pageNumbers.map(number => <button key={number}>{number}</button>)
                }
            </div>
        </>
    );
};

export default Shop;