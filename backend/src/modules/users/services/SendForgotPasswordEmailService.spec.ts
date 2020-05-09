import AppError from '@shared/errors/AppErrors';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('sendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be send forgot email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhondoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able send forgot email for an inexistent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jhondoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhondoe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
