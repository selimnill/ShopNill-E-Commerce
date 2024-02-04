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
      <div className="grid grid-cols-5 gap-4 justify-center items-center p-5">
        {categories.map((cat) => (
          <div className="">
            <div className="border-2 border-sky-500 bg-sky-600 h-28 w-34 rounded-xl  flex items-center justify-center cursor-pointer hover:bg-slate-100  hover:text-sky-500 hover:font-bold">
              <Link to={`/category/${cat?.slug}`}>{cat?.name}</Link>
            </div>
          </div>
          // <ul
          //   key={cat?._id}
          //   className="flex justify-center items-center bg-orange-300 h-full "
          // >
          //   <li className="hover:bg-orange-500 p-3  rounded-lg">
          //     <Link
          //       to={`/category/${cat?.slug}`}
          //       className=" p-5 text-lg font-bold"
          //     >
          //       {cat?.name}
          //     </Link>
          //   </li>
          // </ul>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
