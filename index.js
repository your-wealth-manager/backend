const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./.env.local" });

const transactions = require('./routes/transactions');

connectDB();

const app = express()

const corsOptions = {
    origin: true,
    credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.get("/", (req, res) => {
//     res.send("Up and running");
// });

app.use('/api/V1/transactions', transactions);

// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/user");

// app.use("/auth", authRoute);
// app.use("/user", userRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server is up and running in ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold));