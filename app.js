const express = require("express");
const cors = require("cors");

//Authentication
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//Route Imports
const usersRoutes = require("./routes/usersRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//Passport Middleware
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/", usersRoutes); // we can use   app.use( usersRoutes); work the same
app.use("/profile", profileRoutes);
app.use("/media", express.static("media"));

// Path not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
