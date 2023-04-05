import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {

        const storedCart = getShoppingCart();
        const savedCart = [];

        // Step : (1) get id 
        for (const id in storedCart) {
            // Step: (2) get the product using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                // Step: (3) get the quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step: (4) added the addedProduct to the save cart
                savedCart.push(addedProduct);
            }
        }
        // step:(5) set the cart
        setCart(savedCart);

    }, [products])

    const handleAddToCart = (product) => {
        //    cart.push(product)
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
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
    );
};

export default Shop;