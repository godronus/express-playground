import cors from "cors";
import { engine } from "express-handlebars";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { env } from "./env.js";
import * as middlewares from "./middlewares.js";
import { secondsToColor, timestampString } from "./utils";
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
    color: secondsToColor(),
  });
});

app.get("/block1", setCacheTtl(5), (req, res) => {
  res.render("widget", {
    layout: false,
    timestamp: timestampString(),
    title: "ESI Include: Short CacheDuration (5s)",
    blockColor: secondsToColor(),
    route: "/block1",
  });
});

app.get("/block2", setCacheTtl(12), (req, res) => {
  res.render("widget", {
    layout: false,
    timestamp: timestampString(),
    title: "ESI Include: Long Cache Duration  (12s)",
    blockColor: secondsToColor(),
    route: "/block2",
  });
});

app.get("/400", (req, res) => {
  res.status(400).render("error", {
    layout: false,
    message: "Bad Request",
    timestamp: timestampString(),
  });
});

app.get("/401", (req, res) => {
  res.status(401).render("error", {
    layout: false,
    message: "Unauthorized",
    timestamp: timestampString(),
  });
});

app.get("/402", (req, res) => {
  res.status(402).render("error", {
    layout: false,
    message: "Payment Required",
    timestamp: timestampString(),
  });
});

app.get("/403", (req, res) => {
  res.status(403).render("error", {
    layout: false,
    message: "Forbidden",
    timestamp: timestampString(),
  });
});

app.get("/404", (req, res) => {
  res.status(404).render("error", {
    layout: false,
    message: "Not Found",
    timestamp: timestampString(),
  });
});

app.get("/417", (req, res) => {
  res.status(417).render("error", {
    layout: false,
    message: "Expectation Failed",
    timestamp: timestampString(),
  });
});

app.get("/500", (req, res) => {
  res.status(500).render("error", {
    layout: false,
    message: "Internal Server Error",
    timestamp: timestampString(),
  });
});
app.get("/501", (req, res) => {
  res.status(501).render("error", {
    layout: false,
    message: "Not Implemented",
    timestamp: timestampString(),
  });
});
app.get("/502", (req, res) => {
  res.status(502).render("error", {
    layout: false,
    message: "Bad Gateway",
    timestamp: timestampString(),
  });
});
app.get("/503", (req, res) => {
  res.status(503).render("error", {
    layout: false,
    message: "Service Unavailable",
    timestamp: timestampString(),
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// connection
app.listen(port, () => console.log(`Listening to port ${port}`));

export default app;
