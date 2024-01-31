import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductDetails();
  }, [params?.slug]);

  // get product details
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details - ShopNill Store"}>
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <img
            className="rounded-xl text-center mt-[-20px]"
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
            alt={product?.name}
          />
        </div>
        <div className="col-span-2 ml-3">
          <h1 className="text-xl mb-3 font-bold text-center">
            Product Details
          </h1>
          <h4 className="text-lg">
            <span className="font-semibold">Name : </span> {product?.name}
          </h4>
          <h4 className="text-lg">
            <span className="font-semibold">Description : </span>{" "}
            {product?.description}
          </h4>
          <h4 className="text-lg">
            <span className="font-semibold">Price : $ </span> {product?.price}
          </h4>
          <h4 className="text-lg">
            <span className="font-semibold">Category : </span>{" "}
            {product?.category?.name}
          </h4>
          <button className="btn btn-primary mt-2">ADD TO CART</button>
        </div>
      </div>
      <div className="row">
        <h1 className="text-xl">Similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="font-semibold text-center mt-3">
            No Similar Product Found.!
          </p>
        )}
        <div className="flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div
              key={p?._id}
              className="border border-3 rounded ml-2 border-gray-600 h-64 w-52 mt-6"
            >
              <figure className="px-10 pt-10">
                <img
                  className="rounded-xl h-28 w-28 text-center mt-[-20px]"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                  alt={p?.name}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-sm mt-[-25px]">{p?.name}</h2>
                <p className="text-xs">
                  {p?.description.length >= 20
                    ? p?.description.slice(0, 23) + "..."
                    : p?.description}
                </p>
                <p className="text-xs">
                  <b>$ {p?.price}</b>
                </p>
                <div className="flex justify-center items-center gap-1 bottom-1">
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

export default ProductDetails;
