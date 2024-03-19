import { FC, memo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  CartItemContainer,
  ItemDetails,
  RemoveCartItem,
} from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

import { clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, quantity, imageUrl, price } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
      <RemoveCartItem onClick={clearItemHandler}>&#10005;</RemoveCartItem>
    </CartItemContainer>
  );
});

export default CartItem;
