import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./pages/home/Home";
import CartDetails from "./pages/cart-details/CartDetails";
import { LoadingContext } from "./contexts/LoadingContext";
import "./App.css";
import { Cart } from "./types";

const App: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [addCartError, setAddCartError] = useState<string | null>(null);
  const [loadingCarts, setLoadingCarts] = useState<boolean>(false);
  const [loadingAddCart, setLoadingAddCart] = useState<boolean>(false);
  const [loadingDeleteCart, setLoadingDeleteCart] = useState<{
    [id: number]: boolean;
  }>({});
  let navigate = useNavigate();

  useEffect(() => {
    setLoadingCarts(true);
    async function fetchData() {
      try {
        const response = await fetch("https://dummyjson.com/carts");
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setCarts(data.carts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCarts(false);
      }
    }
    fetchData();
  }, []);

  const handleCartSelect = (cart: Cart) => {
    setSelectedCart(cart);
    navigate(`/cart/${cart.id}`);
  };

  async function deleteCart(id: number) {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const deletedCart = await response.json();
      if (deletedCart.isDeleted) {
        setCarts(carts.filter((c) => c.id !== id));
        if (selectedCart && selectedCart.id === id) {
          setSelectedCart(null);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDeleteCart({ [id]: false });
    }
  }

  const handleCartDelete = (id: number) => {
    if (id < 21 && id > 0) {
      setLoadingDeleteCart({ [id]: true });
      deleteCart(id);
    } else {
      setCarts(carts.filter((c) => c.id !== id));
      if (selectedCart && selectedCart.id === id) {
        setSelectedCart(null);
      }
    }
  };

  const handleCartAdd = async (
    products: { id: number; quantity: number }[]
  ) => {
    setLoadingAddCart(true);
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          products,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const newCart = await response.json();
      const transformedCart = {
        ...newCart,
        id: carts[carts.length - 1]?.id + 1,
      };
      setCarts([...carts, transformedCart]);
    } catch (error) {
      setAddCartError("Error while creating a cart: " + error);
    } finally {
      setLoadingAddCart(false);
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        loadingCarts,
        loadingAddCart,
        loadingDeleteCart,
      }}
    >
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleCartAdd={handleCartAdd}
                addCartError={addCartError}
                carts={carts}
                handleCartSelect={handleCartSelect}
                handleCartDelete={handleCartDelete}
              />
            }
          />
          <Route
            path="cart/:id"
            element={<CartDetails cart={selectedCart} />}
          />
        </Routes>
      </div>
    </LoadingContext.Provider>
  );
};

export default App;
