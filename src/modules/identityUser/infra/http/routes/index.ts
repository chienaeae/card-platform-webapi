import express, {Request, Response} from "express";
import {Result} from "../../../../../core/logic/Result";
import {RegisterController} from "../../../useCases/register/RegisterController";
import {RegisterUseCase} from "../../../useCases/register/RegisterUseCase";
import {IdentityUserRepo} from "../../../repos/IdentityUserRepo";
import * as models from "../../../../../infra/sequlize/models"
import bodyParser from "body-parser";
import {TokenController} from "../../../useCases/identityAuth/TokenController";
import {AuthUseCase} from "../../../useCases/identityAuth/AuthUseCase";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    const repo = new IdentityUserRepo(models);
    const useCase = new RegisterUseCase(repo);
    await new RegisterController(useCase).execute(req, res);
});


identityUserRouter.post('/token', async (req:Request, res: Response) => {
    const repo = new IdentityUserRepo(models);
    const useCase = new AuthUseCase(repo);
    await new TokenController(useCase).execute(req, res);
});



export {identityUserRouter};