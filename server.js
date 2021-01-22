const express = require("express");
const path = require("path");

const db = require("./db/Notes");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

const PORT = process.env.PORT || 3001;

// MIDDLEWARE
// Handle POST body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Static directory to be served
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log("listening on port " + PORT));
