import React, { useState, useEffect } from "react";
import { Cart } from "../../types";
import "./CartList.css";
import Pagination from "../pagination/Pagination";
import { useLoadingContext } from "../../contexts/LoadingContext";
import { CircularProgress, Skeleton } from "@mui/material";
import { isMobile } from "../../types";
import { motion } from "framer-motion";

interface CartListProps {
  carts: Cart[];
  onCartSelect: (cart: Cart) => void;
  onCartDelete: (id: number) => void;
}

const CartList: React.FC<CartListProps> = ({
  carts,
  onCartSelect,
  onCartDelete,
}) => {
  const { loadingDeleteCart, loadingCarts } = useLoadingContext();

  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = isMobile ? 4 : 8;

  const totalPages = Math.ceil(carts.length / itemsPerPage);

  const displayCarts = carts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCarts = () => {
    if (loadingCarts) {
      return Array.from(Array(itemsPerPage)).map((_, index) => (
        <div key={index} className="grid-item">
          <Skeleton variant="rectangular" height={70} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <div className="buttons-row">
            <Skeleton height={30} width={80} />
            <Skeleton height={30} width={80} />
          </div>
        </div>
      ));
    } else {
      return displayCarts.map((cart) => (
        <div key={cart.id} className="grid-item">
          <h2>Cart {cart.id}</h2>
          <p>Total Products: {cart.totalProducts}</p>
          <p>Total Quantity: {cart.totalQuantity}</p>
          <p>Total Price: ${cart.total}</p>
          <div className="buttons-row">
            <button
              className="button contained"
              onClick={() => onCartSelect(cart)}
            >
              Details
            </button>
            {loadingDeleteCart[cart.id] && (
              <div className="loader">
                <CircularProgress color="error" />
              </div>
            )}
            {!loadingDeleteCart[cart.id] && (
              <button
                className="button text error"
                onClick={() => onCartDelete(cart.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    }
  };

  const [previousPage, setPreviousPage] = useState(0);

  useEffect(() => {
    setPreviousPage(currentPage);
  }, [currentPage]);

  const pageVariants = {
    initial: { opacity: 0, x: previousPage < currentPage ? "-50vw" : "50vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: currentPage < previousPage ? "100vw" : "-100vw" },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="cart-list">
      <motion.div
        key={currentPage}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="grid-container">{renderCarts()}</div>
      </motion.div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CartList;
