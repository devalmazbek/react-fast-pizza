import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../ui/Button'
import { decreaseQuantity, getCurrentQuantityById, increaseQuantity } from './cartSlice';

export default function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

    function handleIncreaseQuantity(id) {
        dispatch(increaseQuantity(id));
    }

    function handleDecreaseQuantity(id) {
        dispatch(decreaseQuantity(id))
    }

  return (
    <div className='flex items-center gap-2'>
        <Button type="round" onClick={() => handleDecreaseQuantity(pizzaId)}>-</Button>
        <span>{currentQuantity}</span>
        <Button type="round" onClick={() => handleIncreaseQuantity(pizzaId)}>+</Button>
    </div>
  )
}
