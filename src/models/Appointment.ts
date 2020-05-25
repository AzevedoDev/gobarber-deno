import { v4 } from "https://deno.land/std/uuid/mod.ts";
class Appointment {
  id: string;
  provider: string;
  date: Date;
  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.provider = provider;
    this.date = date;
    this.id = v4.generate();
  }
}

export default Appointment;
