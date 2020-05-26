import { Application } from "https://deno.land/x/oak/mod.ts";
import { appointmentsRouters } from "./routes/appointmentsRouters.ts";

const app = new Application();

app.use(appointmentsRouters.routes());
app.use(appointmentsRouters.allowedMethods());

console.log("App start on port 3000 🚀");
await app.listen({ port: 3000 });
