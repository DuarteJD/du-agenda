import AppError from '@shared/errors/AppErrors';

import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('CreateUser', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUser = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    const uploadAvatar = await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'foto.png',
    });

    expect(uploadAvatar.avatar).toBe('foto.png');
  });

  it('should not be able to update avatar of a inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUser = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUser.execute({
        user_id: 'no-existing-user',
        avatarFilename: 'foto.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete a user avatar on update a new', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleterFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUser = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'foto.png',
    });

    await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'fotonova.png',
    });

    expect(deleterFile).toHaveBeenCalledWith('foto.png');
    expect(user.avatar).toBe('fotonova.png');
  });
});
