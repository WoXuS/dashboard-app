import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Chart from "../../components/chart/Chart";
import { Cart, Product } from "../../types";
import "./CartDetails.css";

interface CartDetailsProps {
  cart: Cart | null;
}

interface ProductWithDiscountedPrice extends Product {
  discountedPricePerPiece: number;
}

const CartDetails: React.FC<CartDetailsProps> = ({ cart }) => {
  let navigate = useNavigate();
  if (!cart) {
    navigate("/");
    return null;
  }
  console.log(cart);
  const products = cart.products.map((product) => ({
    ...product,
    discountedPricePerPiece: Math.ceil(
      product.discountedPrice / product.quantity
    ),
  }));

  const pageVariants = {
    initial: { opacity: 0, y: "-50vh" },
    in: { opacity: 1, y: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="cart-details">
        <div className="cart-header">
          <h2>
            Details of cart {cart.id} ({cart.totalProducts} products)
          </h2>
          <button
            className="button contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
        </div>
        {products.map((product: ProductWithDiscountedPrice) => (
          <div className="cart-product" key={product.id}>
            <h4>{product.title}</h4>
            <div className="product-details">
              <div className="product-row">
                <h3>{product.quantity}</h3>
                <div className="product-prices">
                  <div className="total-prices">
                    <h3>${product.discountedPrice}</h3>
                    <p>${product.total}</p>
                  </div>
                  {product.quantity > 1 && (
                    <p>per piece: ${product.discountedPricePerPiece}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Chart data={products} />
      </div>
    </motion.div>
  );
};

export default CartDetails;
