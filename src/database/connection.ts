import { Database } from "https://deno.land/x/denodb/mod.ts";
import AppointmentSchema from "../database/Appointments.ts";
import {
  bgBlue,
  white,
} from "https://deno.land/std/fmt/colors.ts";

export const database = new Database("postgres", {
  database: "gobarber",
  host: "localhost",
  username: "postgres",
  password: "admin",
});

export async function start() {
  const startServer = (message: string) => {
    return bgBlue(white(`[ ${message} ]`));
  };
  console.log(startServer("START CONNECT TO DATABASE"));
  database.link([AppointmentSchema]);
  await database.sync();
  console.log(startServer("CONNECTION STABLISHED"));
}
