import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            old_password: Joi.string(),
            password: Joi.string().when('old_password', {
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    then: Joi.required(),
                    otherwise: Joi.forbidden(),
                }),
        },
    }),
    profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
