import { Application } from "./deps.ts";
import { appointmentsRouters } from "./routes/appointmentsRouters.ts";
import { logger, timer } from "./middlewares/mod.ts";
import * as database from "./database/mod.ts";

const app = new Application();

try {
  app.use(logger);
  app.use(timer);
  app.use(appointmentsRouters.routes());
  app.use(appointmentsRouters.allowedMethods());
  await database.connection.start();
} catch (error) {
  console.error(error);
}

console.log("App start on port 3000 🚀");
await app.listen({ port: 3000 });
