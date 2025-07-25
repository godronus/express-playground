import cors from "cors";
import { engine } from "express-handlebars";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";
import { timestampString } from "./utils/timestamp.js";
import { setCacheTtl } from "./middlewares.js";

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

// app.use(express.static(path.join(__dirname, "../public")));

// app.get<object, MessageResponse>("/", (req, res) => {
//   res.json({
//     message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
//   });
// });

app.get("/", setCacheTtl(), (req, res) => {
  res.render("home", { layout: false, timestamp: timestampString() });
});

app.get("/block1", setCacheTtl(10), (req, res) => {
  res.render("widget", { layout: false, timestamp: timestampString() });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
