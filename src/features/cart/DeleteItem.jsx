import React from 'react'
import { useDispatch } from 'react-redux';

import Button from '../../ui/Button'

import { deleteItem } from './cartSlice';


export default function DeleteItem({pizzaId}) {
  const dispatch = useDispatch();

  function handleRemoveCartItem(id) {
    dispatch(deleteItem(id))
  }

  return <Button type="small" onClick={() => handleRemoveCartItem(pizzaId)}>Delete</Button>
}
