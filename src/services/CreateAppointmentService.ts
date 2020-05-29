import Appointment from "../models/Appointment.ts";
import AppointmentsRepo from "../repositories/AppointmentsRepo.ts";
import {
  startOfMinute,
} from "../deps.ts";

interface Request {
  date: Date;
  provider: string;
}
type T = {
  findByDate: Function;
};

function CreateAppointmentService(appointmentsRepo = AppointmentsRepo()) {
  return {
    /**
     * execute
     */
    async execute({ date, provider }: Request): Promise<Appointment> {
      const appointmentDate = startOfMinute(date);
      const findAppointmentInSameDate = await appointmentsRepo.findByDate(
        appointmentDate,
      );
      if (findAppointmentInSameDate) {
        throw Error("This appointment is already booked");
      }

      const appointment = await appointmentsRepo.create(
        { provider, date: appointmentDate },
      );
      return appointment;
    },
  };
}

export default CreateAppointmentService;
