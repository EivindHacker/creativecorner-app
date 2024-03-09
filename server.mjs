import "dotenv/config";
import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import SuperLogger from "./modules/SuperLogger.mjs";
import printDeveloperStartupInportantInformationMSG from "./modules/developerHelpers.mjs";

// Import USER_API and other route handlers as needed
import USER_API from "./routes/usersRoute.mjs";
import IDEA_API from "./routes/IdeasRoute.mjs";

printDeveloperStartupInportantInformationMSG();

// Creating an instance of the server
const server = express();

// Selecting a port for the server to use.
const port = process.env.PORT || 8080;
server.set("port", port);

// Enable logging for server
const logger = new SuperLogger();
server.use(logger.createAutoHTTPRequestLogger());

// Resolve the directory name from the current module's URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Defining a folder that will contain static files.
server.use(express.static(path.join(__dirname, "public")));

// Telling the server to use the USER_API
server.use("/user", USER_API);
server.use("/idea", IDEA_API);

// Route all requests to the main HTML file
server.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
server.listen(server.get("port"), function () {
	console.log("Server is running on port", server.get("port"));
});
