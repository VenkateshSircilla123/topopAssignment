import User from "../models/User.js";
import QrCode from "../models/QrCode.js";
import bcrypt from "bcrypt";
import QRCode from "qrcode";
export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      ...req.body,
      password: hash,
    });
    await user.save();
    const { password, ...other } = user._doc;
    console.log(user);
    if (user) {
      const qrCodeImage = await QRCode.toDataURL(
        `http://localhost:8000/users/${user._id}`
      );
      const qr = new QrCode({
        userId: user._id,
        qrImage: qrCodeImage,
      });
      await qr.save();
      res.status(201).send({ other, qr });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found");
    }
    const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassCorrect) {
      return res.status(404).send("Wrong Password!");
    }
    const { password, ...other } = user._doc;
    res.status(200).send("login successfull", other);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
