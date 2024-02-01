import React, { useState } from "react";
import registerImg from "../../assets/Auth/registerimgg.png";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.!");
    }
  };
  return (
    <Layout title={"Profile - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <UserMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <div>
            <div className="hero bg-base-200">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <form onSubmit={handleSubmit} className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-2">
                      Update Profile
                    </h2>
                    <div className="form-control">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="input border-none"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input border-none"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input border-none"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        className="input border-none"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="input border-none"
                        required
                      />
                    </div>
                    <div className="form-control mt-6 border-none">
                      <button className="btn btn-primary">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
