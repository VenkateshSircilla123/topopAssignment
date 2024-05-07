import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import qrRoute from "./routes/rqRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
const app = express();

//middlewares
dotenv.config();
app.use(
  cors({
    origin: [`${process.env.baseURL}`, "https://accounts.google.com"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

const __dirname = path.resolve();

//routes
app.use("/users", userRoute);
app.use("/qr", qrRoute);

//mongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//backend and front at same url,
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  //react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen("8000", () => {
  connect();
  console.log("server started");
});
