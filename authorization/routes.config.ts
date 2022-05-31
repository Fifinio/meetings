import * as AuthorizationController from './controllers/authorization.controller';
import * as VerifyUserMiddleware from './middlewares/verify.user.middleware';
import * as AuthValidationMiddleware from '../common/middlewares/auth.validation.middleware';
import { Express } from 'express';

export const routesConfig = function (app: Express) {
    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login   
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};