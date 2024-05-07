import React from "react";

const SignIn = () => {
  return (
    <form
      className="container w-80 border-1 border-black"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Sign in to your account</h3>
      <div className=" mt-5">
        <h6>Email Address</h6>
        <input
          type="text"
          name="username"
          id=""
          className="w-full p-2 border-2 border-gray rounded"
        />
      </div>
      <div className=" mt-4">
        <div className="flex justify-between">
          <h4>Password</h4>
          <span>Forgot password?</span>
        </div>
        <input
          type="text"
          name="username"
          id=""
          className="w-full p-2 border-2 border-gray rounded"
        />
      </div>
      <button className="w-full mt-5">Submit</button>
    </form>
  );
};

export default SignIn;
