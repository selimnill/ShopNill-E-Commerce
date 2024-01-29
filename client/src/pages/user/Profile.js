import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";

const Profile = () => {
  return (
    <Layout title={"Profile - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <UserMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1>Profile</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
