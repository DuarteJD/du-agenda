import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindProvidersDTO from '@modules/users/dtos/IFindProvidersDTO';

import User from '../../infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindProvidersDTO): Promise<User[]> {
    const users: User[] = this.users.filter(user => user.id !== except_user_id);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const indexUser = this.users.findIndex(findUser => findUser.id === user.id);
    if (indexUser >= 0) {
      this.users[indexUser] = user;
    }
    return user;
  }
}
export default UsersRepository;
