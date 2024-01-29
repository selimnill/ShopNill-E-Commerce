import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Orders - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <UserMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1>All Orders</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
