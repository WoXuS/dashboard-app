import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useLoadingContext } from "../../contexts/LoadingContext";
import "./AddCart.css";

interface AddCartProps {
  onCartAdd: (products: { id: number; quantity: number }[]) => void;
  error: string | null;
}

const AddCart: React.FC<AddCartProps> = ({ onCartAdd, error }) => {
  const [products, setProducts] = useState<{ id: number; quantity: number }[]>(
    []
  );
  const { loadingAddCart } = useLoadingContext();

  const handleAddProduct = () => {
    setProducts([...products, { id: 1, quantity: 1 }]);
  };

  const handleIdChange = (index: number, id: number) => {
    const newProducts = [...products];
    newProducts[index].id = id;
    setProducts(newProducts);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newProducts = [...products];
    newProducts[index].quantity = quantity;
    setProducts(newProducts);
  };

  const handleSubmit = () => {
    const validProducts = products.filter((product) => product.id > 0);
    const aggregatedProducts: { [key: number]: number } = {};

    validProducts.forEach((product) => {
      if (aggregatedProducts[product.id]) {
        aggregatedProducts[product.id] += product.quantity;
      } else {
        aggregatedProducts[product.id] = product.quantity;
      }
    });
    onCartAdd(
      Object.keys(aggregatedProducts).map((key) => ({
        id: parseInt(key),
        quantity: aggregatedProducts[parseInt(key)],
      }))
    );
    setProducts([]);
  };

  const inputVariants = {
    initial: { opacity: 0, y: "-7vh" },
    in: { opacity: 1, y: 0 },
  };

  const inputTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  return (
    <div className="add-cart">
      <h2>Create a new cart</h2>
      {error && <p className="error">{error}</p>}
      {!error &&
        products.map((product, index) => (
          <motion.div
            key={index}
            initial="initial"
            animate="in"
            variants={inputVariants}
            transition={inputTransition}
          >
            <div className="product-input">
              <label>
                Product ID:
                <input
                  type="number"
                  min="1"
                  value={product.id}
                  onChange={(e) =>
                    handleIdChange(index, parseInt(e.target.value))
                  }
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                />
              </label>
            </div>
          </motion.div>
        ))}
      {loadingAddCart && <CircularProgress />}
      {!loadingAddCart && (
        <div className="buttons-row">
          <button className="button contained" onClick={handleAddProduct}>
            Add product
          </button>
          <button
            className="button outlined"
            onClick={handleSubmit}
            disabled={products.length === 0}
          >
            Create cart
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCart;
