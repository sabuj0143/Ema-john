import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveCart }) => {
    const { id, name, price, img, quantity } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <p className='item-title'>{name}</p>
                <p>Price: <span className='price-text'>${price}</span></p>
                <p>Order Quantity: <span className='price-text'>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveCart(id)} className='btn-delete'>
                <FontAwesomeIcon className='btn-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;