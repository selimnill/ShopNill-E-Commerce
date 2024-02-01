import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  });

  return (
    <Layout title={"Category Product - ShopNill Store"}>
      <div className="text-center mt-6">
        <h1 className="text-lg">
          <b>Category Name : </b>
          {category?.name}
        </h1>
        <h3 className="text-base">{products?.length} result Found </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  <button className="btn btn-primary btn-xs">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
