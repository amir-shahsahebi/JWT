const express = require("express");
const auth = require("./routes/auth");
const app = express();

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hi I'm working");
});

// npm run start
app.listen(5000, () => {
  console.log("Now runing on port 5000");
});
