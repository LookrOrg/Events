//general import
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


//express import
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//routes
const appRoutes = require("./routes/App");
const userRoutes = require("./routes/User");
const eventRoutes = require("./routes/Event");
const chatRoutes = require("./routes/Chat");

//middleware
app.use(cors());
app.use(bodyParser.json());


//middleware delle routes
app.use("/api/", appRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});