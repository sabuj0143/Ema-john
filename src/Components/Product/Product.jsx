import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props);
    const { id, name, img, price, seller, ratings } = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p className='seller-info'>Manufacturer : {seller}</p>
                <p>Ratings : {ratings} Start</p>
            </div>
            <button className='btn-cart'>Add to Cart</button>
        </div>
    );
};

export default Product;