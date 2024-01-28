import React from "react";
import { NavLink } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiShieldPlusFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4 className="text-lg">Admin Panel</h4>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <a>
              <BiSolidCategoryAlt size={18} />
              <NavLink
                className={"font-bold"}
                to="/dashboard/admin/create-category"
              >
                Create Category
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <PiShieldPlusFill size={18} />
              <NavLink
                className={"font-bold"}
                to="/dashboard/admin/create-product"
              >
                Create Product
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <FaUsers size={18} />
              <NavLink className={"font-bold"} to="/dashboard/admin/users">
                Users
              </NavLink>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
