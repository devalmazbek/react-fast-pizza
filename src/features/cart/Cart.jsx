import { useSelector, useDispatch } from 'react-redux';

import CartItem from "./CartItem"

import EmptyCart from './EmptyCart'
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

import { getUsername } from '../users/userSlice';
import { clearCart, getCart } from './cartSlice';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-lg font-semibold'>Your cart, {username}</h2>

      <ul className="mt-3 mb-6 divide-y divide-stone-200 border-b">
        {cart.map((item) => <CartItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className='space-x-3'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;