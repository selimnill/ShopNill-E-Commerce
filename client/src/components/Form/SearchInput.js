import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Here..."
        className="input sm:border md:-border w-24 md:w-auto border-none "
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button className="btn btn-danger" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
