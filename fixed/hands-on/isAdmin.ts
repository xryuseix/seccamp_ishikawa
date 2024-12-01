import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import process from "node:process";

const app: express.Express = express();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? "8080";

app.use(bodyParser.json());

const uid2Flag: { [key: string]: string | undefined } = {
  admin: "seccamp{congratulations!}",
  user: "No flag for you",
};

app.get("/", (_, res) => {
  res.send(
    `How to use -> curl -X POST -H "Content-Type: application/json" -d '{"userId": "user"}' http://${HOST}:${PORT}\n`
  );
});

interface PostBody extends Request {
  body: {
    userId: string;
  };
}

app.post("/", (req: PostBody, res: Response) => {
  const userId = req.body.userId;
  // FIXED
  if (typeof userId !== "string") {
    res.send("userId is not a string");
    return;
  }
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
