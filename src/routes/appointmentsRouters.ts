import { parseISO, Router } from "../deps.ts";
import AppointmentsRepo from "../repositories/AppointmentsRepo.ts";
import CreateAppointmentService from "../services/CreateAppointmentService.ts";

export const appointmentsRouters = new Router();
const appointmentsRepo = new AppointmentsRepo();

appointmentsRouters.post("/appointment", async ({ request, response }) => {
  try {
    const { value: {provider,date} } = await request.body();
    const parseDate = parseISO(date, null);
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepo,
    );
    const appointment = await createAppointmentService.execute(
      { provider, date: parseDate },
    );
    response.body = appointment;
  } catch (error) {
    response.status = 400;
    response.body = { error: error.message };
  }
}).get("/appointment", async ({ response }) => {
  response.body = await appointmentsRepo.all();
});
