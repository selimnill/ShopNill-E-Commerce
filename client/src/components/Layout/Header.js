import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LogOut SuccessfullY.!");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost  lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu 3menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/category"}>Category</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <NavLink
                    onClick={handleLogOut}
                    to={"/login"}
                    className={"ml-4"}
                  >
                    LogOut
                  </NavLink>
                </>
              )}
              <li>
                <NavLink to={"/cart"}>Cart</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to={"/"} className="btn btn-ghost text-xl tracking-widest ">
            <BsFillHandbagFill className="text-blue-800" /> ShopNill
          </NavLink>
        </div>

        <div className="navbar-center  lg:flex navbar-end hidden">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/category"}>Category</NavLink>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <NavLink
                  onClick={handleLogOut}
                  to={"/login"}
                  className={"mt-2"}
                >
                  LogOut
                </NavLink>
              </>
            )}
            <li>
              <NavLink to={"/cart"}>Cart</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
