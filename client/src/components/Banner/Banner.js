import React from "react";
import man from "../../assets/Banner/man.avif";
import women from "../../assets/Banner/women.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="grid grid-cols-6 gap-0 max-w-[800px] md:max-w-[450px] sm:max-w-[200px] lg:max-w-[1000px]">
      <div className="col-span-4 bg-gradient-to-b from-orange-300 to-orange-500">
        <img src={man} className="absolute w-auto" alt="man" />
        <div className="uppercase space-y-0 mt-5 mr-8 bg-gradient-to-b  from-slate-800 to-gray-500 ">
          <h4 className="lg:text-black md:text-black relative flex justify-end sm:text-white sm:top-24 top-36  lg:top-52 lg:text-lg md:text-md sm:text-sm text-xs lg:mr-16 mr-[30px] font-light">
            Winter 2023
          </h4>{" "}
          <br />
          <h2 className="lg:text-black md:text-black relative flex justify-end lg:top-48 sm:top-24 top-28 font-bold lg:text-lg md:text-md sm:text-sm text-lg lg:mr-11 sm:text-white ml-9">
            new arrivals
          </h2>
          <div className="relative flex justify-end sm:top-24 top-28 lg:top-52 font-bold lg:text-lg md:text-md sm:text-sm text-xs lg:mr-10">
            {" "}
            <Link to="/mens-collection">
              <button className="btn btn-accent uppercase ">
                discover now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:w-10  lg:mr-30 mr-0">
        <img
          src={women}
          alt="women"
          className="absolute sm:w-[100px] w-44 mr-0 md:w-[200px] lg:w-[270px]"
        />
        <div className="trending relative lg:top-80 md:top-64 top-44 left-4 uppercase  font-semibold lg:w-34 md:w-34 w-24">
          <div className="lg:w-52 md:w-52 w-36 bg-slate-400 lg:p-4 md:p-4 p-2 lg:m-3 sm:mt-5 rounded pointer-event hover:bg-gray-300">
            <Link to="/women-collection">
              <span className="lg:text-sm md:text-sm text-xs text-center">
                {" "}
                top view in this week
              </span>{" "}
              <br />{" "}
              <span className="lg:text-xl text-center lg:ml-5 md:text-xl md:ml-5 text-md">
                {" "}
                trending
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
