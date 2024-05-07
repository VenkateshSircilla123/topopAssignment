import React from "react";
import LoginCard from "../components/LoginCard";
import ImageAnimation from "../components/ImageAnimation";

const LoginPage = () => {
  return (
    <div className="">
      <div className="flex justify-center md:justify-between">
        <div className="flex w-1/2 justify-center items-center">
          <LoginCard />
        </div>
        <div className="w-1/2 justify-center hidden md:flex">
          <ImageAnimation />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
