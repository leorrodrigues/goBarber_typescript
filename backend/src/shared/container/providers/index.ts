import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProdiver/models/IMailProvider';
import EtherealMailProvider from './MailProdiver/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);