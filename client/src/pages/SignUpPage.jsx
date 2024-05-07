import React from "react";
import SignupCard from "../components/SignupCard";
import ImageAnimation from "../components/ImageAnimation";
const SignUpPage = () => {
  return (
    <div className="">
      <div className="flex justify-center md:justify-between">
        <div className="flex w-1/2 justify-center">
          <SignupCard />
        </div>
        <div className="w-1/2 justify-center hidden md:flex">
          <ImageAnimation />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
