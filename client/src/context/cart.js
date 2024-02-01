import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItms = localStorage.getItem("cart");

    if (existingCartItms) setCart(JSON.parse(existingCartItms));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
