import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) navigate("/login");
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <div className="flex justify-center flex-col items-center mb-3 min-h-[500px]">
      <h2 className="text-3xl font-semibold">
        Redirecting to Login page in{" "}
        <span className="text-blue-800 font-bold">{count}</span> second
      </h2>
      <span className="loading loading-ring loading-lg mt-5"></span>
    </div>
  );
};

export default Spinner;
