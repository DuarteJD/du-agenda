// import AppError from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 14, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 15, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: '1',
      month: 5,
      year: 2020,
      day: 21,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
