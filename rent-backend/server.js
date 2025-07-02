const express = require("express");

const app = express();

const PORT = 4000;

require("dotenv").config();

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log("Connected");
});
