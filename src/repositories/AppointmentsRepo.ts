import Appointment, { AppointmentSchema } from "../models/Appointment.ts";
import {
  isEqual,
  parseISO,
} from "https://deno.land/x/date_fns/index.js";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepo {
  /**
   * all = Get all appointments from database
   */
  public async all() {
    try {
      const getAppointments = await AppointmentSchema.all();
      return getAppointments;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * findByDate = find appointments by Date
   */
  public async findByDate(date: Date): Promise<any> {
    const getAppointments = await AppointmentSchema.all();
    const findAppointment = await getAppointments.find((appointment) =>
      isEqual(date, appointment.date)
    );
    return findAppointment;
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
