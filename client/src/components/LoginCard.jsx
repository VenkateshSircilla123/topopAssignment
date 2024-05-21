import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
const LoginCard = () => {
  const provider = new GoogleAuthProvider();
  const [userData, setuserData] = useState({
    email: null,
    password: null,
  });

  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //create user with firebase
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    const user = await axios.post(
      `https://topopassignment.onrender.com/users/login`,
      userData
    );
  };

  const handleSinupGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setuserData({
          firstName: user?.displayName,
          lastName: "",
          email: user?.email,
          password: "",
          phone: user?.phoneNumber,
          profile: user?.photoURL,
          cover: "",
          uid: user?.uid,
        });
        console.log(userData);

        const qr = await axios({
          method: "post",
          baseURL: "https://topopassignment.onrender.com",
          url: "/qr/gen",
          data: user,
        });
        console.log(qr);
        localStorage.setItem(
          "user",
          JSON.stringify({ other: userData, qr: qr.data })
        );
        window.location.reload();

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error?.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <form
      className="container max-w-[400px] border-1 border-black"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Sign in to your account</h3>

      <div className=" mt-4">
        <h6>Email Address</h6>
        <input
          type="text"
          name="email"
          id=""
          className="w-full p-2 border-2 border-[rgb(183 191 207)] rounded"
          onChange={(e) =>
            setuserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className=" mt-4">
        <div className="flex justify-between">
          <h4>Password</h4>
          <span color="blue">Forgot password?</span>
        </div>
        <input
          type="password"
          name="password"
          id=""
          className="w-full p-2 border-2 border-[rgb(183 191 207)] rounded"
          onChange={(e) =>
            setuserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <button className="w-full mt-5">Submit</button>
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-100 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid items-center">
          <div>
            <a
              href="#"
              class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img
                class="h-6 w-6"
                src="https://www.svgrepo.com/show/506498/google.svg"
                alt=""
                onClick={handleSinupGoogle}
                name="google"
              />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginCard;
