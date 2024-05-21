import QrCode from "../models/QrCode.js";
import QRCode from "qrcode";
export const createqr = async (req, res) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(
      `https://topopassignment.onrender.com/users/${req.body.uid}`
    );
    console.log(req.body);
    const qr = new QrCode({
      userId: req.body.uid,
      qrImage: qrCodeImage,
    });
    await qr.save();
    res.status(201).send(qr);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const getqr = async (req, res) => {
  try {
    const qr = await QrCode.findById(req.params.id);
    if (!qr) {
      res.status(404).send("Qr not found");
    }
    res.status(200).send(qr);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
