import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";

export const CreateProduct = () => {
  return (
    <Layout title={"Create Product admin - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1>Create Product</h1>
        </div>
      </div>
    </Layout>
  );
};
