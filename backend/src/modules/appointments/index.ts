import { container } from 'tsyringe';

import IAppointmentsRepository from './repositories/IAppointmentsRepository';
import AppointmentsRepository from './infra/typeorm/repositories/AppointmentsRepository';

const providers = {
    appointments: AppointmentsRepository,
};

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    providers.appointments,
);
