// increase the maximum number of listeners to suppress the warning
require("events").EventEmitter.defaultMaxListeners = 16;

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
// Import one more route handler
//const projectsRoutes = require('./routes/projects'); // to import the projects router
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig"); // Import Swagger configuration
require("dotenv/config");
//const keys = require('./config/keys');

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set the static files directory
app.use(express.static("public"));

// set cookie session lifespan
app.use(
  session({
    // secret: keys.session.cookieKey,
    secret: process.env.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to ensure authentication before accessing /api-docs
const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User authenticated, proceed to the next middleware
  }
  res.redirect("/auth/login"); // User not authenticated, redirect to login page
};

// Serve Swagger UI with authentication middleware
app.use("/api-docs", authCheck, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// set up authRoute
app.use("/auth", authRoutes);
// set up profile route
app.use("/profile", profileRoutes);
// set up route for projects
//app.use('/projects', projectsRoutes);
//go back to controllers and use index
//app.use('/', require('./routes/index'))

// Import the logout route
const logoutRouter = require("./routes/logout");

// Use the logout route
app.use("/logout", logoutRouter);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/vehicleInfo", (req, res) => {
  res.render("vehicleInfo", { user: req.user });
});

// Create middlewares
app.use(bodyParser.json());

// Import routes
const postsRoutes = require("./routes/projects");
app.use("/projects", postsRoutes);

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Connected to MongoDB Successfully!");

    // Set the port from the environment variable or default to 3000
    const port = process.env.PORT || 4000;

    // Start the server after successfully connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
