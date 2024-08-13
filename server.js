const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "uploads");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3000;

// Routes
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const ImageRoutes = require("./routes/imageRoutes");

app.use(userRoutes);
app.use(addressRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(ImageRoutes);


app.get("/", (req, res) => {
  res.send("Server is running on port " + PORT);
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); // ทดสอบการเชื่อมต่อฐานข้อมูล
    await sequelize.sync(); // สร้างตารางในฐานข้อมูลหากยังไม่มี

    console.log(
      `Tables synchronized with database. And Server is running on port ${PORT}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
