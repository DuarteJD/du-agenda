// import AppError from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDay: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDay = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 14, 0, 0),
      provider_id: '1',
      user_id: '2',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 15, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime();
    });

    const availability = await listProviderDay.execute({
      provider_id: '1',
      month: 5,
      year: 2020,
      day: 21,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
