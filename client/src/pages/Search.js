import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout/Layout";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-4 text-lg font-semibold">Search Results</h1>
          <h6>
            {values?.results?.length < 1 ? (
              "No Products Found"
            ) : (
              <>
                Found :{" "}
                <span className="text-bold">{values?.results?.length}</span>
              </>
            )}
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {values &&
              values?.results?.map((p) => (
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
                      <button className="btn btn-primary btn-xs">
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
      </div>
    </Layout>
  );
};

export default Search;
