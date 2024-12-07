const express = require("express");
const process = require("node:process");

const app = express();
const PORT = process.env.PORT ?? "8082";
const DOMAIN = process.env.CPDOMAIN ?? `localhost:${PORT}`;

const DEBUG = false;

function getFlag() {
  return "seccamp{this_is_a_dummy_flag}";
}

function chall(times) {
  let x = 1;
  for (let i = 0; i < times; i++) {
    DEBUG && console.log({ i, x });
    if (x === 0) {
      return "You lose!";
    }
    if (-1 < x < 1) {
      // hmm...can you get the flag?
      return `You win! ${getFlag()}`;
    }
    x = x << 1;
  }
  return "You lose!";
}

app.get("/", (req, res) => {
  const query = req.query;
  if (query.times === undefined) {
    res.json({
      message: `How to use -> curl 'http://${DOMAIN}/?times=3'`,
    });
    return;
  }
  try {
    const times = Number.parseInt(query.times);
    if (times < 0 || 100 <= times) {
      throw new Error("Invalid parameter");
    }
    const result = chall(times);
    res.json({ message: result });
  } catch (e) {
    res.json({ message: "Invalid parameter" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${DOMAIN}`);
});
