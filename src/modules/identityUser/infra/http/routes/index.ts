import express, {Request, Response} from "express";
import container from "../../../../../infra/inversify/config/config";
import {TYPES} from "../../../../../infra/inversify/config/types";
import {RegisterController} from "../../../useCases/register/RegisterController";
import {TokenController} from "../../../useCases/identityAuth/TokenController";
import {Result} from "../../../../../core/logic/Result";
import {RegisterUseCaseResponse} from "../../../useCases/register/RegisterUseCase";
import {AuthResponse} from "../../../useCases/identityAuth/AuthUseCase";
import {UseCase} from "../../../../../core/domain/UseCase";
import {IdentityTokenDTO} from "../../../useCases/identityAuth/IdentityTokenDTO";
import {RegisterDTO} from "../../../useCases/register/RegisterDTO";
import {AuthDTO} from "../../../useCases/identityAuth/AuthDTO";
import {IdentityUser} from "../../../domain/IdentityUser";
import bodyParser from "body-parser";
import {BaseController} from "../../../../../core/infra/BaseController";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.RegisterController).execute(req, res);
});

identityUserRouter.post('/token', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.TokenController).execute(req, res);
});



export {identityUserRouter};