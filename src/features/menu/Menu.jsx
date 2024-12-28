import { useLoaderData } from "react-router-dom";

import MenuItem from './MenuItem';

import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  const data = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {data && data.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} />)}
    </ul>
  );
}


export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;