const Message = require("./models/Message");
const Server = require("./models/Server");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("../ssl.key"),
    cert: fs.readFileSync("../ssl.ca"),
  },
  app
);
var cors = require("cors");
const { fstat } = require("fs");

require("dotenv").config();
const conn = mongoose.connection;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) {
      throw err;
    }

    console.log("MongoDB Connected");
    io.on("disconnect", (socket) => {
      console.log("Disconnected");
      delete socket;
    });
    io.on("connection", (socket) => {
      let chat = conn.collection("messages");
      console.log("User Connected");

      //neue message
      socket.on("message", (msg) => {
        const newMessage = new Message({
          author: msg.author,
          text: msg.text,
          server: msg.server,
          date: Date.now(),
        });
        newMessage.save();

        io.emit("newMessage", msg);
      });
    });
    //ganzen chat holen
    app.post("/chat", async (req, res) => {
      const messages = await Message.find({
        server: req.body.server_name,
      }).sort({ date: 1 });
      res.status(200).json(messages);
    });

    app.post("/login", async (req, res) => {
      const server = await Server.findOne({
        server_name: req.body.server_name,
      });
      if (!server) {
        res.status(404).send();
      } else {
        if (server.password === req.body.password) {
          res.status(200).send(server);
        } else {
          res.status(405).send();
        }
      }
    });

    //POST http://localhost:3000/file
    app.post("/uploadpost", (req, res) => {
      const post = new Post({
        image: req.body.image,
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        server: req.body.server,
        date: Date.now(),
      });
      post.save();
      res.status(200).send();
    });

    //get all posts
    app.post("/posts", async (req, res) => {
      const query = {
        server: req.body.server,
      };
      const posts = await Post.find(query).sort({ date: -1 });

      res.status(200).send(posts);
    });
  }
);

conn.once("open", () => {
  console.log("Verbindung eröffnet");
});

httpsServer.listen(process.env.API_PORT, () => {
  console.log("listening on Port: ", process.env.API_PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket, polling"],
  },
});
