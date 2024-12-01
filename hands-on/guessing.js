const express = require("express");
const bodyParser = require("body-parser");
const process = require("node:process");

const app = express();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? "8081";

app.use(bodyParser.json());

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const MIN_SIZE = 5;
const MAX_VALUE = 1_000_000;

function numberGuessing(obj) {
  if (
    typeof obj.width !== "number" ||
    typeof obj.height !== "number" ||
    obj.width < MIN_SIZE ||
    obj.height < MIN_SIZE
  ) {
    return `Invalid input, width and height must be a number and greater than ${MIN_SIZE}`;
  }
  const input = {
    width: obj.width ?? randomInt(MIN_SIZE),
    heigth: obj.height ?? randomInt(MIN_SIZE),
    ...obj,
  };

  const display = Array.from({ length: input.width * input.heigth }, () =>
    randomInt(MAX_VALUE)
  );
  console.log("[DEBUG] Display:");
  console.table(display);

  const idx = randomInt(display.length);
  if (display[idx] === input.value) {
    return "Correct! seccamp{congratulations!}";
  }
  return `Incorrect! The value at ${idx} is ${display[idx]}, not ${input.value}`;
}

app.get("/", (_, res) => {
  res.send(
    `How to use -> curl -X POST -H "Content-Type: application/json" -d '{"width": 5, "height": 5, "value": 10}' http://${HOST}:${PORT}\n`
  );
});

app.post("/", (req, res) => {
  try {
    res.send(numberGuessing(req.body));
  } catch (error) {
    res.send(`Invalid input, an error is occured: ${error.error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
