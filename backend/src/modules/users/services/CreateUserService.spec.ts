import AppError from '@shared/errors/AppErrors';
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with email duplicated', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jhondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
