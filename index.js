require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 3500;
const path = require("path");
const server = express();
const { userRouter } = require("./routes/userRouter");
const { quoteRouter } = require("./routes/quoteRouter");
const connectToMongoDB = require("./config/connectToMongoDB");
const corsOptions = require("./config/corsOptions");

// NOTE: Connect to MongoDB Server using mongoose
connectToMongoDB();

// NOTE: Middleware:-
server.use(cors(corsOptions));
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(process.env.PUBLIC_DIR));

server.get("/", (req, res) => {
  console.log("IS THIS WORKING?");
  res.send("Hello World");
});
server.use("/api/users", userRouter);
server.use("/api/quotes", quoteRouter);
server.use("/api/products", require("./routes/productRouter"));

server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

server.listen(port, () => {
  console.log(`server running at ${port}`);
});
