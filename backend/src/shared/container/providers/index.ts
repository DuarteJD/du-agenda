import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IMailProvider from './mailProvider/models/IMailProvider';
import EthrealMailProvider from './mailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  new HandlebarsMailTemplateProvider(),
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EthrealMailProvider),
);
