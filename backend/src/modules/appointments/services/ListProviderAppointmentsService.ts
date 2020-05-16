/* eslint-disable no-param-reassign */
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    year: number;
    month: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            { day, month, year, provider_id },
        );

        return appointments;
    }
}

export default ListProviderAppointmentsService;
