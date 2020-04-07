import React from 'react';

import {CartItemContainer, CartItemImage, ItemDetailsContainer} from './cart-item.styles'

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt='item'></CartItemImage>
        <ItemDetailsContainer>
            <span>{name}</span>
            <span>{quantity} x ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
)
export default CartItem;
