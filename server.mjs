// Importing required modules using ECMAScript module syntax
import "dotenv/config";
import express from "express";
import USER_API from "./routes/usersRoute.mjs";
import path from "path";

// Creating an instance of the server
const server = express();

// Selecting a port for the server to use.
const port = process.env.PORT || 8080;
server.set("port", port);

// Get the current module's directory using import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Defining a folder that will contain static files.
server.use(express.static("public"));

// Telling the server to use the USER_API
server.use("/user", USER_API);

server.use((req, res) => {
	res.status(404);
	const errorFilePath = path.join(__dirname, "public", "error.html");
	res.sendFile(errorFilePath);
});

// A get request handler example
server.get("/", (req, res, next) => {
	req.originalUrl;

	res
		.status(200)
		.send(JSON.stringify({msg: "These are not the droids...."}))
		.end();
});

// Start the server
server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});
