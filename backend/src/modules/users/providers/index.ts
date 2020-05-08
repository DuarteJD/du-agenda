import { container } from 'tsyringe';
import IHashProvider from './hashProvider/models/IHashProvider';
import BCryptHashProvider from './hashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
