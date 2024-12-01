import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import process from "node:process";

const app: express.Express = express();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? "8081";

app.use(bodyParser.json());

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const MIN_SIZE = 5;
const MAX_VALUE = 1_000_000;

type Input = {
  width: number;
  height: number;
  value: number;
};

function numberGuessing(input: Input) {
  if (
    typeof input.width !== "number" ||
    typeof input.height !== "number" ||
    input.width < MIN_SIZE ||
    input.height < MIN_SIZE
  ) {
    return `Invalid input, width and height must be a number and greater than ${MIN_SIZE}`;
  }

  const display = Array.from({ length: input.width * input.height }, () =>
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

app.post("/", (req: Request, res: Response) => {
  try {
    res.send(numberGuessing(req.body));
  } catch (error) {
    res.send(`Invalid input, an error is occured: ${error.error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
