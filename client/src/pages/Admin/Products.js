import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
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
      <div className="grid grid-cols-4 ">
        <div className="">
          <AdminMenu />
        </div>
        <div>
          <h1 className="text-center text-xl font-bold mt-8 mb-8">
            All Products List
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-64 lg:ml-[100px] mt-7">
            {products.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p?.slug}`}
                className="card w-52 bg-base-100 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    className="rounded-xl h-28 w-28"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{p.name}</h2>
                  <p>{p?.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
