import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalQuantity);
    const totalCartPrice = useSelector(getTotalPrice);

    if(!totalCartQuantity) return

    return (
      <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase px-4 py-3 sm:px-6 md:text-base">
        <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
          <span>{totalCartQuantity} pizzas</span>
          <span>{formatCurrency(totalCartPrice)}</span>
        </p>
        <Link to='/cart'>Open cart &rarr;</Link>
      </div>
    );
  }
  
  export default CartOverview;