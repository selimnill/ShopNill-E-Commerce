import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setShipping] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  //   get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setquantity(data?.product?.quantity);
      setShipping(data?.product?.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // get all category;
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
      toast.error("Something went wrong to getting category");
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
        toast.success("Product created successfully");
      } else {
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Update Product admin - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1 className="text-center font-bold w-75 mb-4 text-xl">
            Update Product
          </h1>
          <div className="m-1 w-75">
            <Select
              placeholder="Select a category"
              required
              showSearch
              className="form-select mb-3 border-none h-14 input-primary"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat?.name}
                </Option>
              ))}
            </Select>
            <div className="flex justify-content-center align-items-center ">
              <div className="mb-3">
                <label className="btn btn-outline btn-accent">
                  {photo ? photo?.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      required
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="h-32 border-info border-2 rounded-lg ml-2"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                required
                className="form-control input input-bordered input-info w-full "
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Write a description"
                required
                className="form-control textarea textarea-info w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Write a price"
                required
                className="form-control input input-bordered input-info w-full"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                required
                className="form-control input input-bordered input-info w-full"
                onChange={(e) => setquantity(e.target.value)}
              />
            </div>
            <Select
              placeholder="Select shippping"
              required
              showSearch
              className="form-select mb-3 border-none h-14 w-full"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option className="border-none" value="0">
                No
              </Option>
              <Option className="border-none" value="1">
                Yes
              </Option>
            </Select>
          </div>
          <div className="mb-3 text-center w-75">
            <button
              className="btn  font-bold bg-green-500 hover:bg-green-600 hover:text-white"
              onClick={handleCreate}
            >
              UPDATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
