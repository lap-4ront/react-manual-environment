import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";

const https = require("https");
const fs = require("fs");
const port = 4327;

var key = fs.readFileSync(__dirname + "/../../certs/selfsigned.key");
var cert = fs.readFileSync(__dirname + "/../../certs/selfsigned.crt");
var options = {
  key: key,
  cert: cert
};

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>My react app</title>
      </head>
      <body>
        <div id="root">${initialMarkup}</div>
        <script src="main.js"></script>
      </body>
    </html>
  `);
});

const myServer = https.createServer(options, server);

myServer.listen(port, () => {
  console.log("server starting on port : " + port);
});

// server.listen(4327, () => console.log("Server is running..."));
