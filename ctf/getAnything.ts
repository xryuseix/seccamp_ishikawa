import express from "express";
import bodyParser from "body-parser";
import process from "node:process";

const app: express.Express = express();
const PORT = process.env.PORT ?? "8084";
const DOMAIN = process.env.GADOMAIN ?? `localhost:${PORT}`;
app.use(bodyParser.json());

class Flag {
  // public members
  birthday: number;

  // private members
  #secretKey: number;
  #flag: string;

  constructor() {
    this.birthday = 1225;
    this.#flag = "seccamp{this_is_a_dummy_flag}";
    this.#secretKey = 12345;
  }

  // private method
  #getAnything(key: keyof this) {
    return `${this[key]}`;
  }
}

function chall(query = "birthday") {
  const s = new Flag();
  try {
    const value = s[query].toString();
    return JSON.stringify({ result: value });
  } catch (e) {
    return JSON.stringify({ error: "Invalid key" });
  }
}

app.get("/", (_req, res) => {
  res.send(
    `How to use -> curl -X POST -H "Content-Type: application/json" -d '{"query": "birthday"}' http://${DOMAIN}\n`,
  );
});

app.post("/", (req, res) => {
  const query = req.body.query;
  // check ascii range
  if (
    typeof query !== "undefined" &&
    query.match(/[^a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~.]/)
  ) {
    res.send(JSON.stringify({ error: "Invalid character" }));
    return;
  }
  const result = chall(query);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${DOMAIN}`);
});
