import Appointment, { AppointmentSchema } from "../models/Appointment.ts";
import {
  isEqual,
} from "https://deno.land/x/date_fns/index.js";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepo {
  private appointments: Appointment[];
  constructor() {
    this.appointments = [];
  }

  /**
   * all = Get all appointments from database
   */
  public all() {
    return this.appointments;
  }

  /**
   * findByDate = find appointments by Date
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );
    return findAppointment || null;
  }

  /**
   * create = create a new appointment
   */
  public async create(
    { provider, date }: CreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = new Appointment(
      { provider, date },
    );
    const { id } = appointment;
    await AppointmentSchema.create({ id, provider, date });
    return appointment;
  }
}

export default AppointmentsRepo;
