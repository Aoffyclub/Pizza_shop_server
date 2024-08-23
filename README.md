# 🍕 Pizza Shop Server

This is the backend server for the Pizza Shop web application, built with Node.js and Express. It provides RESTful API endpoints for managing the menu, orders, users, and more.

## 🛠️ Features

- RESTful API for pizza menu management (CRUD operations).
- Order processing and management.
- User authentication and authorization (JWT-based).
- Role-based access control for admins and users.
- Integration with a database (e.g., MySQL) using Sequelize ORM.

## 🚀 Technologies Used

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**: JavaScript runtime environment.
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **Express**: Web framework for Node.js.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) **Sequelize**: Promise-based ORM for Node.js.
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) **JWT**: For authentication and authorization.
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**: Database for storing data.

## ⚙️ Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aoffyclub/Pizza_shop_server.git
   cd Pizza_shop_server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and configure the following variables:

   ```plaintext
   SQL_HOST=<Your database host>
   SQL_HOST_PORT=<Your database host port>
   SQL_NAME=<Your database username>
   SQL_PASSWORD=<Your database password>
   SQL_SCHEMA_NAME=<Your database name>

   ```

   Replace the placeholders with your actual database credentials and JWT secret.

4. **Run database migrations:**

   ```bash
   npx sequelize db:migrate
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

## 📝 API Endpoints

# API Endpoints

## Admin Management
- **POST** `/api/admin/create`: Create a new admin account.
- **POST** `/api/admin/login`: Log in an admin and return a JWT.

## Address Management
- **POST** `/api/address`: Create a new address for the authenticated user.
- **GET** `/api/address`: Fetch the address of the authenticated user.
- **DELETE** `/api/address`: Delete the address of the authenticated user.
- **PATCH** `/api/address`: Update the address of the authenticated user.

## Cart Management
- **POST** `/api/cart`: Add a product to the cart of the authenticated user.
- **GET** `/api/cart`: Fetch all cart items for the authenticated user.
- **DELETE** `/api/cart/:id`: Remove a product from the cart of the authenticated user.

## Image Upload
- **POST** `/api/upload/product`: Upload an image for a product (Authenticated users only).

## Order Management
- **POST** `/api/order`: Create a new order (Authenticated users only).
- **GET** `/api/order`: Fetch all orders for the logged-in user (Authenticated users only).
- **GET** `/api/order/:id`: Fetch a single order by ID (Authenticated users only).
- **POST** `/api/order/status`: Update the payment status of an order (Authenticated users only).
- **POST** `/api/order/cancel`: Cancel an order (Authenticated users only).
- **GET** `/api/allorders`: Fetch all orders across all users (Admin only).
- **GET** `/api/reportdata`: Fetch report data related to orders (Admin only).

## Product Management
- **POST** `/api/product`: Create a new product (Authenticated users only).
- **DELETE** `/api/deleteproduct`: Delete a product (Authenticated users only).
- **GET** `/api/product`: Fetch all products.

## User Management
- **POST** `/api/user`: Create a new user account.
- **POST** `/api/login`: Log in a user and return a JWT.
- **POST** `/api/userInfo`: Update the user's information (Authenticated users only).
- **DELETE** `/api/user`: Delete the user account (Authenticated users only).
- **GET** `/api/userInfo`: Fetch the authenticated user's information.
- **GET** `/api/users`: Fetch all users (Authenticated users only).


## 📂 Project Structure

The project structure is organized as follows:

```
Pizza_shop_server/
├── config/               # Database and other configurations
├── controllers/          # Route handlers
├── models/               # Sequelize models
├── routes/               # API routes
├── middlewares/          # Custom middleware
├── migrations/           # Database migrations
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
└── server.js             # Entry point for the application
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## 📧 Contact

For any inquiries, feel free to reach out to the project maintainer at [offfyclub@gmail.com](mailto:aoffyclub@gmail.com).
