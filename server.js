const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const fs = require("fs");
const path = require("path");
const uploadsDir = path.join(__dirname, "uploads");
const productDir = path.join(uploadsDir, "product");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Create 'uploads/product' directory if it doesn't exist
if (!fs.existsSync(productDir)) {
  fs.mkdirSync(productDir);
}

const app = express();
app.use(express.json());
app.use(cors());


app.use("/uploads", express.static("./uploads"));


const PORT = 2000;

// Routes
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const ImageRoutes = require("./routes/imageRoutes");
const adminRoutes = require("./routes/addminRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(userRoutes);
app.use(addressRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(ImageRoutes);
app.use(adminRoutes);
app.use(orderRoutes);

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pizza Shop API",
      version: "1.0.0",
      description: "API for documenting a pizza shop",
    },
    servers: [
      {
        url: "http://localhost:2000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to the route files for Swagger to generate docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
