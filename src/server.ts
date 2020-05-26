import { Application } from "https://deno.land/x/oak/mod.ts";
import { appointmentsRouters } from "./routes/appointmentsRouters.ts";
import * as database from "./database/mod.ts";
import { logger, timer } from "./middlewares/mod.ts";

const app = new Application();

app.use(logger);
app.use(timer);
app.use(appointmentsRouters.routes());
app.use(appointmentsRouters.allowedMethods());
database.connection.start();

console.log("App start on port 3000 🚀");
await app.listen({ port: 3000 });
