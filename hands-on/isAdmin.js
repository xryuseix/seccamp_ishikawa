const express = require("express");
const bodyParser = require("body-parser");
const process = require("node:process");

const app = express();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? "8080";

app.use(bodyParser.json());

const uid2Flag = {
  admin: "seccamp{congratulations!}",
  user: "No flag for you",
};

app.get("/", (_, res) => {
  res.send(
    `How to use -> curl -X POST -H "Content-Type: application/json" -d '{"userId": "user"}' http://${HOST}:${PORT}\n`
  );
});

app.post("/", (req, res) => {
  const userId = req.body.userId;
  if (userId === "admin") {
    res.send("You are not allowed to use admin as userId");
    return;
  }
  const flag = uid2Flag[userId];
  res.send(flag ?? "can't find the flag");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
