import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '@modules/users/dtos/IFindProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
