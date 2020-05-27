import Appointment from "../models/Appointment.ts";
import AppointmentsRepo from "../repositories/AppointmentsRepo.ts";
import {
  startOfHour,
} from "../deps.ts";
import * as database from "../database/mod.ts";

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
  public async execute({ date, provider }: Request): Promise<Appointment> {
    await database.connection.start();
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepo.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepo.create(
      { provider, date: appointmentDate },
    );
    return appointment;
  }
}

export default CreateAppointmentService;
