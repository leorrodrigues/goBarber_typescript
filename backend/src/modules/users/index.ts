import { container } from 'tsyringe';

import IUsersRepository from './repositories/IUsersRepository';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from './repositories/IUserTokensRepository';
import UserTokensRepository from './infra/typeorm/repositories/UserTokensRepository';

const providers = {
    users: UsersRepository,
    userTokens: UserTokensRepository,
};

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    providers.users,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    providers.userTokens,
);
