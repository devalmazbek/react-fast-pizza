import { createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, {loader as menuLoader} from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {action as createOrderAction} from './features/order/CreateOrder';
import Order, {loader as orderItem} from './features/order/Order';
import {action as updateActionOrder} from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

export const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      errorElement: <Error/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/menu',
          element: <Menu/>,
          loader: menuLoader,
          errorElement: <Error/>,
        },
        {
          path: '/cart',
          element: <Cart/>
        },
        {
          path: '/order/new',
          element: <CreateOrder/>,
          action: createOrderAction,
        },
        {
          path: '/order/:orderId',
          element: <Order />,
          loader: orderItem,
          errorElement: <Error />,
          action: updateActionOrder,
        }
      ]
    }
  ]);