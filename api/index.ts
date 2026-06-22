import cors from "cors";
import { engine } from "express-handlebars";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { env } from "./env.js";
import * as middlewares from "./middlewares.js";
import { cacheColor, secondsToColor, timestampString } from "./utils";
import { setCacheTtl } from "./middlewares.js";

const port = env.PORT || 9001;

const app = express();

// Set up Handlebars as the view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
const viewsPath = path.join(__dirname, "../views");
app.set("views", viewsPath);

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", setCacheTtl(21), (req, res) => {
  res.render("home", {
    layout: false,
    timestamp: timestampString(),
    color: cacheColor(21),
  });
});

app.get("/418", setCacheTtl(5), (req, res) => {
  res.render("418", {
    layout: false,
    trace_id: "00-4c03b7ac79e263752ae9ca72a208c867-823b86f1f44b90ba-01",
    your_ip: " 2001:8a0:46f4:9d00:511a:9aaf:33e9:c405",
  });
});

app.get("/block1", setCacheTtl(5), (req, res) => {
  res.render("widget", {
    layout: false,
    timestamp: timestampString(),
    title: "ESI Include: Short CacheDuration (5s)",
    blockColor: cacheColor(5),
    route: "/block1",
  });
});

app.get("/block2", setCacheTtl(12), (req, res) => {
  res.render("widget", {
    layout: false,
    timestamp: timestampString(),
    title: "ESI Include: Long Cache Duration  (12s)",
    blockColor: cacheColor(12),
    route: "/block2",
  });
});

app.get("/local", (req, res) => {
  if (req.headers["x-auth-header"]) {
    res.status(200).send("All good!!");
  }
  res.status(500).send("Missing x-auth-header!!");
});

app.get("/200", (req, res) => {
  res.status(200).send("GET - All good!!");
});

app.put("/200", (req, res) => {
  res.status(200).send("PUT - All good!!");
});

app.post("/200", (req, res) => {
  res.status(200).send("POST - All good!!");
});

app.get("/201", (req, res) => {
  res.status(200).send("All good!!");
});

app.get("/400", (req, res) => {
  res.status(400).send("Bad Request");
});

app.get("/401", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.get("/402", (req, res) => {
  res.status(402).send("Payment Required");
});

app.get("/403", (req, res) => {
  res.status(403).send("Forbidden");
});

app.get("/404", (req, res) => {
  res.status(404).send("Not Found");
});

app.get("/405", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

app.get("/417", (req, res) => {
  res.status(417).send("Expectation Failed");
});

app.get("/418", (req, res) => {
  res.status(418).send("I'm a teapot");
});

app.get("/500", (req, res) => {
  res.status(500).send("Internal Server Error");
});
app.get("/501", (req, res) => {
  res.status(501).send("Not Implemented");
});
app.get("/502", (req, res) => {
  res.status(502).send("Bad Gateway");
});
app.get("/503", (req, res) => {
  res.status(503).send("Service Unavailable");
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// connection
app.listen(port, () => console.log(`Listening to port ${port}`));

export default app;
