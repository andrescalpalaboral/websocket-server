const express = require("express");
const cors = require("cors");
const { environmentVariables } = require("../config");
const { socketConnection } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = environmentVariables.port;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.middleware();

    this.socketListener();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  socketListener() {
    this.io.on("connection", socketConnection);
  }
}

module.exports = Server;
