/* eslint-disable no-param-reassign */
import { injectable, inject } from 'tsyringe';

import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    year: number;
    month: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const currentDate = new Date();

        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                year,
                month,
            },
        );

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            const compareDateWithDay = new Date(
                year,
                month - 1,
                day,
                23,
                59,
                59,
            );

            return {
                day,
                available:
                    appointmentsInDay.length < 10 &&
                    isAfter(compareDateWithDay, currentDate),
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailability;
