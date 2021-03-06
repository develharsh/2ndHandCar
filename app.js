const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "config/.env" });
const cloudinary = require("cloudinary");
const path = require("path");
const cors = require("cors");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());
app.use(cors());

//Router Imports
app.use("/api/t", function (req, res, next) {
  res.status(200).json({ status: "200 OK Backend is here." });
});
app.use("/api/v1/user", require("./routes/userRoute.js"));
app.use("/api/v1/category", require("./routes/categRoute.js"));
app.use("/api/v1/post", require("./routes/postRoute.js"));

/*Frontend hai*/
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

require("./utils/connectDB");

const FINAL_PORT = process.env.PORT || 5000;
app.listen(FINAL_PORT, () => {
  //console.log(`Server running ${FINAL_PORT}`);
});
