const express = require("express");

const PORT = process.env.PORT || 8001;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// const gameRoutes = require("./routes/gameRoutes.js");
// app.use("/", gameRoutes);
app.get("/", function (req, res) {
  res.render("index"); // or whatever is your path to view without extension
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
