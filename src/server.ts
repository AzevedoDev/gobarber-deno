import { Application } from "https://deno.land/x/oak/mod.ts";
import { appointmentsRouters } from "./routes/appointmentsRouters.ts";
import { logger, timer } from "./middlewares/mod.ts";

const app = new Application();

try {
  app.use(logger);
  app.use(timer);
  app.use(appointmentsRouters.routes());
  app.use(appointmentsRouters.allowedMethods());
} catch (error) {
  console.error(error);
}

console.log("App start on port 3000 🚀");
await app.listen({ port: 3000 });
