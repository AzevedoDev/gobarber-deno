import { Database } from "../deps.ts";
import { AppointmentSchema } from "../models/Appointment.ts";

import {
  bgBlue,
  white,
} from "../deps.ts";

const Environment = Deno.env.toObject();

export const database = new Database("postgres", {
  database: Environment.GOBARBERDB,
  host: Environment.GOBARBERDBSERVER,
  username: Environment.GOBARBERDBUSER,
  password: Environment.GOBARBERDBPASSWORD,
});

export async function start() {
  const startServer = (message: string) => {
    return bgBlue(white(`[ ${message} ]`));
  };
  try {
    console.log(startServer("START CONNECT TO DATABASE"));
    await database.link([AppointmentSchema]);
    await database.sync({ drop: true });
    console.log(startServer("CONNECTION STABLISHED"));
  } catch (error) {
    console.log(error);
  }
}
