import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { IoIosCamera, IoMdSwap } from "react-icons/io";
import upload from "../utils/upload";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignupCard = () => {
  //user data
  const [userData, setuserData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phone: null,
    profile: null,
    cover: null,
  });
  const [images, setImages] = useState({
    profile: null,
    cover: null,
  });

  //register with google
  const handleSinupGoogle = () => {
    const provider = new GoogleAuthProvider();

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
        console.log(user);

        //this will get the qr data from the database using user's id
        const qr = await axios({
          method: "post",
          baseURL: "https://topopassignment.onrender.com",
          url: "/qr/gen",
          data: user,
        });
        console.log(qr);

        //store the user data into localstorage to maintain app state

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

  const handleChange = async (e) => {
    e.preventDefault();

    //set image url to userData
    const file = e.target.files[0];
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
    console.log(e.target.name);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader);
        setuserData({ ...userData, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(images);
      const profile = await upload(images.profile);
      const cover = await upload(images.cover);

      setuserData({
        ...userData,
        profile: profile,
        cover: cover,
      });

      //catch this profile and cover url and store in db

      //create user with firebase
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      //create user and store in database

      const user = await axios({
        method: "post",
        baseURL: "https://topopassignment.onrender.com",
        url: "/users/register",
        data: userData,
      });
      console.log(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="container max-w-[400px] mt-7 border-1 border-black"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Sign Up to your account</h3>
      <div className="flex justify-between gap-1 mt-5">
        <div className="w-1/2">
          <h6>First Name</h6>
          <input
            type="text"
            name="firstName"
            id=""
            className="w-full p-2 border-2 border-[rgb(183 191 207)] rounded"
            onChange={(e) =>
              setuserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="w-1/2">
          <h6>Last Name</h6>
          <input
            type="text"
            name="lastName"
            id=""
            className="w-full p-2 border-2 border-[rgb(183 191 207)] rounded"
            onChange={(e) =>
              setuserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
      </div>
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
      <div className=" mt-5">
        <h6>Phone Number</h6>
        <input
          type="number"
          name="phone"
          id=""
          className="w-full p-2 border-2 border-[rgb(183 191 207)] rounded"
          onChange={(e) =>
            setuserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between mt-4">
        <label htmlFor="profileInput" className="profileContainer relative">
          <span className="ml-4">profile</span>
          {userData.profile ? (
            <img
              src={userData.profile}
              alt=""
              className="w-20 h-20 rounded-full object-cover z-50 roundImage"
            />
          ) : (
            <div className=" w-20 h-20 rounded-full object-cover z-50 roundImage flex justify-center items-center border-2 border-[#bec6d7]">
              <IoIosCamera color="#bec6d7" />
            </div>
          )}

          <input
            type="file"
            name="profile"
            id="profileInput"
            accept="image/*"
            className="hide absolute inset-0 z-10"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="coverInput" className="profileContainer relative">
          <span className=" ml-5">cover</span>
          {userData.cover ? (
            <img
              src={userData.cover}
              alt=""
              className=" w-20 h-20 rounded-full object-cover z-50 roundImage"
            />
          ) : (
            <div className=" w-20 h-20 rounded-full object-cover z-50 roundImage flex justify-center items-center border-2 border-[#bec6d7]">
              <IoIosCamera color="#bec6d7" />
            </div>
          )}

          <input
            type="file"
            name="cover"
            id="coverInput"
            accept="image/*"
            className="hide absolute inset-0 z-10"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className=" mt-4">
        <div className="flex justify-between">
          <h4>Password</h4>
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
      <button className="w-full mt-5 border-2 rounded-lg border-[#bec6d7]">
        Submit
      </button>
      <h4 className=" text-center mt-4">
        Already have an Account?{" "}
        <a href="/login" className=" text-blue-700">
          Login
        </a>
      </h4>

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
              />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupCard;
