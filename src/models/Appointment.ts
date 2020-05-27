import { DATA_TYPES, Model, v4 } from "../deps.ts";
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
export class AppointmentSchema extends Model {
  static table = "appointments";
  static timestamps = true;

  static fields = {
    id: DATA_TYPES.TEXT,
    provider: DATA_TYPES.STRING,
    date: DATA_TYPES.DATETIME,
  };
}

export default Appointment;
