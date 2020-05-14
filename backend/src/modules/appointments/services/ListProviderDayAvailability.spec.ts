// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from './ListProviderDayAvailability';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailability(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the day availability from specific provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            user_id: 'user_id',

            date: new Date(2020, 4, 20, 16, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'provider_id',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: false },
                { hour: 17, available: true },
            ]),
        );
    });
});
