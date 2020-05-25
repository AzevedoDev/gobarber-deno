import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  startOfHour,
  parseISO,
} from "https://deno.land/x/date_fns/index.js";
import AppointmentsRepo from "../repositories/AppointmentsRepo.ts";

export const router = new Router();
const appointmentsRepo = new AppointmentsRepo();

router.post("/appointment", async ({ request, response }) => {
  const { value: {provider,date} } = await request.body();
  const parseDate = startOfHour(parseISO(date, null));
  const findAppointmentInSameDate = appointmentsRepo.findByDate(parseDate);
  if (findAppointmentInSameDate) {
    response.body = { message: "This appointment is already booked" };
    response.status = 400;
    return;
  }

  const appointment = appointmentsRepo.create({ provider, date: parseDate });
  response.body = appointment;
}).get("/appointment", async ({ response }) => {
  response.body = appointmentsRepo.all();
});
