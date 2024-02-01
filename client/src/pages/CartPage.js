import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  //   delete cart product
  const handleRemove = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item?.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart - ShopNill Store"}>
      <div>
        <div>
          <h1 className="text-center">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>
          <h4 className="text-center mt-3">
            {cart?.length
              ? `You have ${cart?.length} itemes in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your Cart is Empty "}
          </h4>
        </div>
        <div className="grid grid-cols-2 mt-5 m-3 p-3">
          <div>
            {cart?.map((p) => (
              <div className="flex justify-around items-center border m-3 p-4">
                <div>
                  <img
                    className="rounded-xl h-28 w-28 text-center mt-[-20px]"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="flex-none">
                  <h4 className="text-lg">{p?.name}</h4>
                  <p>{p?.description.substring(9, 30)}</p>
                  <h4>Price : $ {p?.price}</h4>
                  <button
                    className="btn bg-red-600 text-white font-semibold"
                    onClick={() => handleRemove(p?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <h4>Cart Summary</h4>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h3 className="text-lg mt-4">Total : {totalPrice()} </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
