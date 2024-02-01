import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

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
        <div className=" ">
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
              className="menu 3menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72 "
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <details>
                  <summary>Categories</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none w-64">
                    {categories?.map((cat) => (
                      <li key={cat?._id}>
                        <NavLink to={"/categories"}>{cat?.name}</NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <SearchInput className="w-52 border-gray-400" />
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
                  <li>
                    <details>
                      <summary>{auth?.user?.name}</summary>
                      <ul className="p-2 bg-base-100 rounded-t-none">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogOut}
                            to={"/login"}
                            className={"ml-4"}
                          >
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              )}
              <li>
                <NavLink to={"/cart"}>Cart(0)</NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="btn btn-ghost text-xl tracking-widest border-none hover:none  "
          >
            <BsFillHandbagFill className="text-blue-800" /> ShopNill
          </NavLink>
        </div>

        <div className=" justify-center  lg:flex text-center hidden">
          <SearchInput />
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <details>
                <summary>
                  <Link to={"/categories"}>Categories</Link>
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none w-64">
                  <li>
                    <Link to={"/categories"}>All Categories</Link>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat?._id}>
                      <NavLink to={`/category/${cat?.slug}`}>
                        {cat?.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </details>
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
                <li>
                  <details>
                    <summary>{auth?.user?.name}</summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogOut}
                          to={"/login"}
                          className={"ml-4"}
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            )}
            <li>
              <NavLink to={"/cart"}>Cart({cart?.length})</NavLink>
            </li>
            <li>
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
