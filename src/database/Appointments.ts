import { DATA_TYPES, Model } from "https://deno.land/x/denodb/mod.ts";
class AppointmensSchema extends Model {
  static table = "appointments";
  static timestamps = true;

  static fields = {
    id: DATA_TYPES.STRING,
    provider: DATA_TYPES.STRING,
    date: DATA_TYPES.DATETIME,
  };
}

export default AppointmensSchema;
