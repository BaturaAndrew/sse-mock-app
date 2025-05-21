const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");
const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);
app.use("/api", router);

app.get("/sse", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 👈 CORS
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let counter = 0;
  let interval = setInterval(() => {
    counter++;

    res.write(
      `data: ${JSON.stringify({
        id: Date.now(),
        text: `Новое событие в ${new Date().toLocaleTimeString()}`,
      })}\n\n`
    );

    clearInterval(interval);
    res.end();
  }, 0);

  res.on("close", () => {
    clearInterval(interval);

    res.end();
  });
});

app.listen(4000, () => {
  console.log("✅ Сервер запущен на http://localhost:4000");
});
