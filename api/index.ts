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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// connection
app.listen(port, () => console.log(`Listening to port ${port}`));

export default app;
