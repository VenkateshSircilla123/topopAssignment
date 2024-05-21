import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
const ImageAnimation = () => {
  return (
    <motion.div variants={fadeIn("up", "spring", 0, 0.75)}>
      <Tilt
        options={{
          reverse: true,
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <dotlottie-player
          src="https://lottie.host/7aaad362-bea9-4169-a498-98dbce9647fe/LG7PIjztHY.json"
          background="transparent"
          speed="1"
          style={{ width: "450px", height: "600px" }}
          loop
          autoplay
        ></dotlottie-player>
      </Tilt>
    </motion.div>
  );
};

//this will makes image move left, right, top, bottom
const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export default ImageAnimation;
