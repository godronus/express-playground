import type { NextFunction, Request, Response } from "express";

import type ErrorResponse from "./interfaces/error-response.js";

import { env } from "./env.js";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export function setCacheTtl(seconds: number = 600) {
  // Default to 10 minutes
  return (req: Request, res: Response, next: NextFunction) => {
    // Set caching headers
    res.set("Cache-Control", `public, max-age=${seconds}`); // Cache for 10 minutes
    res.set("Expires", new Date(Date.now() + seconds * 1000).toUTCString()); // Set expiration time
    next();
  };
}
