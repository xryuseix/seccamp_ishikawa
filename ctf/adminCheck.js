const express = require("express");
const process = require("node:process");

const app = express();
const PORT = process.env.PORT ?? "8083";
const DOMAIN = process.env.ACDOMAIN ?? `localhost:${PORT}`;

app.get("/", (req, res) => {
  const query = req.query;
  if (query.role === undefined) {
    res.json({
      message: `How to use -> curl 'http://${DOMAIN}/?role=user'`,
    });
    return;
  }

  // double check for admin (1/2)
  if (query.role === "admin") {
    res.json({
      message: "Are you admin...? I will not give you the flag.",
    });
    return;
  }

  res.json({
    // double check for admin (2/2)
    message:
      query.role == "admin"
        ? "seccamp{this_is_a_dummy_flag}"
        : "You are not admin!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${DOMAIN}`);
});
