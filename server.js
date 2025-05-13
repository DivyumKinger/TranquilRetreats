const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "Tranquility1234@",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  const user = req.session.user || null;
  res.render("index", { user });
});

const staticPages = [
  "about",
  "admin",
  "booking",
  "checkout",
  "faq",
  "login",
  "policies",
  "register",
  "rooms",
  "services",
  "testimonials",
];
staticPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    const user = req.session.user || null;
    res.render(page, { user });
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.get("/error-test", (req, res, next) => {
  console.log("Error-test route hit");
  const err = new Error("This is a forced error!");
  err.status = 500;
  next(err);
});

app.use("/api", userRoutes);

app.use("/", pageRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
