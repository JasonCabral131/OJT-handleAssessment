const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "tl-student-information",
  api_key: "959629291597869",
  api_secret: "JKTVXEiK4oCq_rKz-3JEn2jwsg4",
});
module.exports = cloudinary;
