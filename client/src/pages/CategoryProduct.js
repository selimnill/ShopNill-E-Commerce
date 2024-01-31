import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();

  const getProductsByCategory = async () => {
    try {
      const { data } = axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      console.log(data?.products);
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
        <h1>helo</h1>
        <h1>{category?.name}</h1>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
