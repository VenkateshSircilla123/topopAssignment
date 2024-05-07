import React, { useState } from "react";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  console.log(data);
  const handleLogout = (e) => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="w-full ">
      <div className="flex justify-end">
        <img
          src={`${
            data?.other?.profile != null
              ? data?.other?.profile
              : "/profile.webp"
          }`}
          alt=""
          className="w-14 h-14 rounded-full object-cover z-50 roundImage"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-[400px] gap-9">
        <span className=" text-center">Welcome</span>
        <button onClick={() => setOpen(!open)}>Show Qr Code</button>
        {open && (
          <img
            src={`${data?.qr?.qrImage != null ? data?.qr?.qrImage : ""}`}
            alt="No used logged in"
            height={200}
            width={200}
          />
        )}
      </div>
      <div className="w-full flex justify-center">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
