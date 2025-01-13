import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart, getTotalPrice } from "../cart/cartSlice";
import { fetchAddress } from "../users/userSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();

  const dispatch = useDispatch();

  const isSubmitting = navigation.state === 'submitting';
  

  const cart = useSelector(getCart);
  const { username, status: addressStatus, position, address, error: addressError } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const totalCartPrice = useSelector(getTotalPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;



  return (
    // <div>
    //   <h2>Ready to order? Let's go!</h2>

    //   <Form method="POST">
    //     <div>
    //       <label>First Name</label>
    //       <input type="text" name="customer" className="input" required />
    //     </div>

    //     <div>
    //       <label>Phone number</label>
    //       <div>
    //         <input type="tel" name="phone" className="input" required />
    //         {formErrors?.phone && <p>{formErrors?.phone}</p>}
    //       </div>
    //     </div>

    //     <div>
    //       <label>Address</label>
    //       <div>
    //         <input className="input" type="text" name="address" required />
    //       </div>
    //     </div>

    //     <div>
    //       <input
    //         className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
    //         type="checkbox"
    //         name="priority"
    //         id="priority"
    //         // value={withPriority}
    //         // onChange={(e) => setWithPriority(e.target.checked)}
    //       />
    //       <label htmlFor="priority">Want to yo give your order priority?</label>
    //     </div>

    //     <div>
    //       <input type="hidden" name="cart" value={JSON.stringify(cart)}/>

    //       <Button disabled={isSubmitting} type="primary">
    //         {isSubmitting ? 'Placing order....' : 'Order now'}
    //       </Button>
    //     </div>
    //   </Form>
    // </div>
     <div className="px-4 py-6">
     <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

     {/* <Form method="POST" action="/order/new"> */}
     <Form method="POST">
       <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
         <label className="sm:basis-40">First Name</label>
         <input className="input grow" type="text" name="customer" value={username} required />
       </div>
      
       <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
         <label className="sm:basis-40">Phone number</label>
         <div className="grow">
           <input className="input w-full" type="tel" name="phone" required />
           {formErrors?.phone && (
             <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
               {formErrors.phone}
             </p>
           )}
         </div>
       </div>

       <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
         <label className="sm:basis-40">Address</label>
         <div className="grow">
           <input
            disabled={isLoadingAddress}
             className="input w-full"
             type="text"
             name="address"
             defaultValue={address}
             required
           />
           {addressError && (
             <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
               {addressError}
             </p>
           )}
         </div>
         { !position.lalatitude && !position.longitude &&
          <span className="absolute right-[3px] z-10" >
          <Button type='small'
            disabled={isLoadingAddress}
            onClick={() => dispatch(fetchAddress())}>
            get position
          </Button>
         </span>
         }
         
       </div>

       <div className="mb-12 flex items-center gap-5">
         <input
           className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
           type="checkbox"
           name="priority"
           id="priority"
           value={withPriority}
           onChange={(e) => setWithPriority(e.target.checked)}
         />
         <label htmlFor="priority" className="font-medium">
           Want to yo give your order priority?
         </label>
       </div>

       <div>
         <input type="hidden" name="cart" value={JSON.stringify(cart)} />
         <input type="hidden" name="position" value={position.lalatitude && position.longitude ? `${position.lalatitude}${position.longitude}` : ""} />
         <Button disabled={isSubmitting || isLoadingAddress} type="primary">
           {isSubmitting ? 'Placing order....' : `Order now ${formatCurrency(totalPrice)}`}
         </Button>
       </div>
     </Form>
   </div>
  );
}


export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }

  const error = {};

  if(!isValidPhone(order.phone)) {
    error.phone = "Please write correct phone number. We need it to contact you!";
  }

  if(Object.keys(error).length > 0) {
    return error
  };

  // if everything is okay, create new order and ridirect  
  const newOrder = await createOrder(order);
  console.log(newOrder);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;