import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);

  // all products
  const getAllProducts = () => {
    try {
      const { data } = axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products Dashboard - ShopNill Store"}>
      <div className="grid grid-cols-2 ">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-4">
          <h1 className="text-center">All Products List</h1>
          {products?.map((p) => (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={p?.photo} alt={p?.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {p?.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{p?.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
