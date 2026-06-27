import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route
            path="/"
            element={
              <CartProvider>
                <Home />
                <CartDrawer />
              </CartProvider>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
