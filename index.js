const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = Process.env.PORT || 5000;

require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
    { useFindAndModify: false }
  )
  .then(() => console.log("db connected successfully"))
  .catch((err) => {
    console.log(err);
  });

//USER Route
const usersRoute = require("./routes/users");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

app.use("/users", usersRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Ecom Serv Act ");
});
app.get("/api/test", (req, res) => {
  console.log("test ok");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});

