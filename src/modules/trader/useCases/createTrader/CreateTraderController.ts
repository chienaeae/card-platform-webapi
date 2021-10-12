import {BaseController} from "../../../../core/infra/BaseController";
import * as express from "express";
import {Result} from "../../../../core/logic/Result";

export class CreateTraderController extends BaseController {
    protected executeImpl(req: express.Request, res: express.Response): void | any {

        try {
            const { username, password, email } = req.body;
            // const usernameOrError: Result<Username> = Username.create(username);
            // const passwordOrError: Result<Password> = Password.create(password);
            // const emailOrError: Result<Email> = Email.create(email);

        } catch (err: unknown) {
            return this.fail(res, (err as Error).message)
        }

    }
}