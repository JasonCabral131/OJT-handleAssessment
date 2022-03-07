const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const config = require("./src/config/configuration");
app.use(cors());
app.use(express.json());
//crudCollege
app.use("/tl-student-information", require("./src/routes/college.routes"));
//AdminRoutes
app.use("/tl-student-information", require("./src/routes/admin.routes"));
app.use("/tl-student-information", require("./src/routes/student.routes"));
app.use("/tl-student-information", require("./src/routes/program.routes"));
app.use("/tl-student-information", require("./src/routes/course.routes"));
app.use("/tl-student-information", require("./src/routes/enroll.routes"));
mongoose.connect(config.MONG0_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log(`Connected To mongodb`);

  const server = app.listen(PORT, () => {
    console.log(`Telmo solution backend running in Port: ${PORT} `);
  });

  //socket connection
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
    },
  });
});
