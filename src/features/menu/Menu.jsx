import { useLoaderData } from "react-router-dom";

import MenuItem from './MenuItem';

import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  const data = useLoaderData();

  return (
    <ul>
      {data && data.map((pizza) => <MenuItem pizza={pizza} />)}
    </ul>
  );
}


export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;