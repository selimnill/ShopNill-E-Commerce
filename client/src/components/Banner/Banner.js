import React from "react";
import man from "../../assets/Banner/man.avif";
import women from "../../assets/Banner/women.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="grid grid-cols-5 gap-0 w-[800px]">
      <div className="col-span-4">
        <img src={man} className="absolute" alt="man" />
        <div className="uppercase space-y-0">
          <h4 className="relative flex justify-end top-52 text-lg  mr-40 font-light">
            Winter 2023
          </h4>{" "}
          <br />
          <h2 className="relative flex justify-end top-48 font-bold text-4xl mr-20">
            new arrivals
          </h2>
          <div className="relative flex justify-end top-52 font-bold text-xl mr-36">
            {" "}
            <Link to="/mens-collection">
              <button className="btn btn-accent uppercase ">
                discover now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 w-10  mr-30">
        <img src={women} alt="women" className="absolute w-[270px]" />
        <div className="trending relative top-64 left-4 uppercase  font-semibold w-34">
          <div className="w-52 bg-slate-400 p-4 m-3 rounded pointer-event hover:bg-gray-300">
            <Link to="/women-collection">
              <span className="text-sm"> top view in this week</span> <br />{" "}
              <span className="text-xl text-center ml-5"> trending</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
