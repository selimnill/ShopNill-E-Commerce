import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // get all categories
  const allCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  // get all product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        // `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get total count product
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <Layout title={"Home - ShopNill Store"}>
      <div className="grid grid-cols-4">
        <div className="flex-col">
          <h2 className="text-center font-bold mb-4 mt-4">
            Filter By Category
          </h2>
          <div className="flex flex-column ml-5">
            {categories?.map((c) => (
              <Checkbox
                key={c?._id}
                onChange={(e) => handleFilter(e.target.checked, c?._id)}
              >
                {c?.name}
              </Checkbox>
            ))}
          </div>
          {/* filter by prices */}
          <h2 className="text-lg font-bold mt-2 mb-2 text-center">Prices</h2>
          <div className="flex flex-column ml-5">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p?._id}>
                  <Radio value={p.array}>{p?.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <h1>{process.env.REACT_APP_API}</h1>
          </div>
          <div className="flex flex-column ml-5">
            <button
              className="btn bg-red-500 hover:bg-red-800 text-white font-semibold mt-5"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="text-center mt-4 mb-4 font-bold">All Products</h1>
          <h1 className="ml-5 font-bold mb-3">Products</h1>
          <div className="flex flex-wrap">
            {products.map((p) => (
              <div className="border border-3 rounded ml-2 border-gray-600 h-64 w-52 mt-6">
                <figure className="px-10 pt-10">
                  <img
                    className="rounded-xl h-28 w-28 text-center mt-[-20px]"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-sm mt-[-25px]">{p.name}</h2>
                  <p className="text-xs">
                    {p?.description.length >= 20
                      ? p?.description.slice(0, 23) + "..."
                      : p?.description}
                  </p>
                  <p className="text-xs">
                    <b>$ {p?.price}</b>
                  </p>
                  <div className="flex justify-center items-center gap-1 bottom-1">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => navigate(`/product/${p?.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Product Added To Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading......" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
