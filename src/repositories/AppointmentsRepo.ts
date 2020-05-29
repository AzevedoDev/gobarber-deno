import Appointment, { AppointmentSchema } from "../models/Appointment.ts";
import { isEqual } from "../deps.ts";
import { Repository } from "./interfaces.ts";

function AppointmentsRepo(): Repository<Appointment> {
  return {
    async all() {
      try {
        const getAppointments = await AppointmentSchema.all();
        return getAppointments;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    async findByDate(date) {
      const getAppointments = await AppointmentSchema.all();
      const findAppointment = await getAppointments.find((appointment) =>
        isEqual(date, appointment.date)
      );
      return findAppointment;
    },
    async create({ provider, date }) {
      const appointment = new Appointment(
        { provider, date },
      );
      const { id } = appointment;
      await AppointmentSchema.create({ id, provider, date });
      return appointment;
    },
  };
}

export default AppointmentsRepo;
