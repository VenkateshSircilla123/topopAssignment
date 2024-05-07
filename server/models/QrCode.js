import mongoose from "mongoose";
const QrCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    qrImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("qrcode", QrCodeSchema);
