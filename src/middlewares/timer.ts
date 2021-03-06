import { Middleware } from "../deps.ts";

export const timer: Middleware = async ({ response }, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  response.headers.set("X-Response-Time", `${duration} ms`);
};
