import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - ShopNill Store"}>
      <h1 className="text-2xl text-center font-bold mt-4 mb-5">
        All Categories
      </h1>
      <div>
        {categories.map((cat) => (
          <ul
            key={cat?._id}
            className="flex justify-center items-center bg-orange-300 h-full "
          >
            <li className="hover:bg-orange-500 p-3  rounded-lg">
              <Link
                to={`/category/${cat?.slug}`}
                className=" p-5 text-lg font-bold"
              >
                {cat?.name}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
