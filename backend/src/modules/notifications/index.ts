import { container } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

const providers = {
    notification: NotificationsRepository,
};

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    providers.notification,
);
