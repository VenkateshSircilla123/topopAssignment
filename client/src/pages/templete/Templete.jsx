import React, { useState, useEffect } from "react";
import "./templete.css";
import { IoCallOutline } from "react-icons/io5";
import axios from "axios";
import { useParams } from "react-router-dom";
const Templete = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const user = axios
      .get(`http://localhost:8000/users/user/${id}`)
      .then(function (response) {
        // handle success
        setUserData(response.data);
        console.log(userData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [userData]);
  return (
    <div className="templeteBackground">
      <div className="contentsContainer">
        <div className="profileC">
          <img src={userData?.profile} alt="" className="" />
          <h2>
            {userData?.firstName} {userData?.lastName}
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="buttonn">
              <IoCallOutline />
              Get in touch
            </div>
          </div>
        </div>

        <div className="linksContainer">
          <div>Portfolio</div>
        </div>

        {/* <div className="linksContainer">
          <div onClick={() => setOpen(!open)}>Show my QR</div>
          {open && <img src={userData?.qrCode} alt="" />}
        </div> */}

        <div className="lastContainer">
          <div className="lcContents justify-between">
            <div className="test">
              <img src="/logo.webp" alt="" className=" h-12" />
              <div className=" d-flex flex-col">
                <p>Designed with qviq</p>
              </div>
            </div>
            <div className="tsignup w-max">
              <button className="">signup</button>
            </div>
            <img src="/logo.webp" alt="" className="logoAb" />
            <img src="/logo.webp" alt="" className="logoAb2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templete;
