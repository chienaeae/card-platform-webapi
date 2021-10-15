import {BaseController} from "../../../../core/infra/BaseController";
import * as express from "express";
import {Result} from "../../../../core/logic/Result";
import {Trader} from "../../domain/Trader";

export class CreateTraderController extends BaseController {
    protected executeImpl(req: express.Request, res: express.Response): void | any {

        try {
            const { userId } = req.body;
            // const usernameOrError: Result<Username> = Username.create(username);
            // const passwordOrError: Result<Password> = Password.create(password);
            // const emailOrError: Result<Email> = Email.create(email);

        } catch (err) {
            return this.fail((err as Error).message)
        }

    }
}