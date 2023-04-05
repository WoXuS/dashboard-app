import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import CartDetails from "./CartDetails";
import { Cart } from "../../types";

const mockCart: Cart = {
  id: 1,
  products: [
    {
      id: 1,
      title: "Sample Product",
      price: 50,
      quantity: 2,
      total: 100,
      discountPercentage: 12.05,
      discountedPrice: 88,
    },
  ],
  total: 100,
  discountedTotal: 90,
  userId: 1,
  totalProducts: 1,
  totalQuantity: 2,
};

describe("CartDetails", () => {
  it("renders cart details", () => {
    render(
      <Router>
        <CartDetails cart={mockCart} />
      </Router>
    );

    expect(screen.getByText(/Details of cart 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/\$88/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getByText(/per piece: \$44/i)).toBeInTheDocument();
  });

  it("navigates back to home page when the back button is clicked", async () => {
    render(
      <Router initialEntries={["/cart/1"]}>
        <Routes>
          <Route
            path="/"
            element={<h1 data-testid="home-page">Home Page</h1>}
          />
          <Route path="/cart/:id" element={<CartDetails cart={mockCart} />} />
        </Routes>
      </Router>
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(backButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});
