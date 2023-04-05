import React from "react";
import AddCart from "../../components/add-cart/AddCart";
import CartList from "../../components/cart-list/CartList";
import { Cart } from "../../types";

interface HomeProps {
  handleCartAdd: (products: { id: number; quantity: number }[]) => void;
  addCartError: string | null;
  carts: Cart[];
  handleCartSelect: (cart: Cart) => void;
  handleCartDelete: (id: number) => void;
}
const Home: React.FC<HomeProps> = ({
  handleCartAdd,
  addCartError,
  carts,
  handleCartSelect,
  handleCartDelete,
}) => {

  return (
    <>
      <AddCart onCartAdd={handleCartAdd} error={addCartError} />
      <CartList
        carts={carts}
        onCartSelect={handleCartSelect}
        onCartDelete={handleCartDelete}
      />
    </>
  );
};

export default Home;
