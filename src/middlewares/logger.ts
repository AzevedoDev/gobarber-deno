import { Middleware } from "https://deno.land/x/oak/middleware.ts";
import {
  toDate,
} from "https://deno.land/x/date_fns/index.js";

import {
  bgWhite,
  bgBlue,
  white,
  yellow,
  underline,
  bold,
  black,
  bgGreen,
} from "https://deno.land/std/fmt/colors.ts";

export const logger: Middleware = async ({ request, response }, next) => {
  await next();

  const now = bgWhite(black(bold(`[${toDate(new Date())}]`)));
  const method = bgBlue(white(bold(` ${request.method} `)));
  const url = underline(request.url.toString());
  const duration = yellow(`${response.headers.get("X-Response-Time")}`);

  console.log(`${now}${method} ${url} ~ ${duration}`);
};
