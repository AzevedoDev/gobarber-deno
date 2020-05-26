import Appointment from "../models/Appointment.ts";
import AppointmentsRepo from "../repositories/AppointmentsRepo.ts";
import {
  startOfHour,
} from "https://deno.land/x/date_fns/index.js";

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepo: AppointmentsRepo;
  constructor(appointmentsRepo: AppointmentsRepo) {
    this.appointmentsRepo = appointmentsRepo;
  }
  /**
   * execute
   */
  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepo.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepo.create(
      { provider, date: appointmentDate },
    );
    return appointment;
  }
}

export default CreateAppointmentService;
