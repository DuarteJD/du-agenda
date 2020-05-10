// import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'jhontre@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Julio Duarte',
      email: 'jcduarte.ti@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
