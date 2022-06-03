//general import
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

//express import
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//routes
const indexRoutes = requie("./routes/Index");
const userRoutes = require("./routes/User");
const eventRoutes = require("./routes/Event");
const chatRoutes = require("./routes/Chat");

//middleware
app.use(cors(), bodyParser.json());

//middleware delle routes
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
