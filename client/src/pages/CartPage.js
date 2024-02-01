import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
              <div
                className="flex justify-around items-center border m-3 p-4"
                key={p?._id}
              >
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
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3 mt-4">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart", // if try to login from cart page. after login user will be redirect to cart page
                      })
                    }
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2 ">
              <div id="dropin-container">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn bg-green-700 text-white"
                      onClick={handlePayment}
                      disabled={!instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
