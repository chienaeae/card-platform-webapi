import express, {Request, Response} from "express";
import {Result} from "../../../../../core/logic/Result";
import {RegisterController} from "../../../useCases/register/RegisterController";
import {RegisterUseCase, RegisterUseCaseResponse} from "../../../useCases/register/RegisterUseCase";
import {IdentityUserRepo} from "../../../repos/IdentityUserRepo";
import * as models from "../../../../../infra/sequlize/models"
import bodyParser from "body-parser";
import {TokenController} from "../../../useCases/identityAuth/TokenController";
import {AuthResponse, AuthUseCase} from "../../../useCases/identityAuth/AuthUseCase";
import {IdentityTokenUseCase} from "../../../useCases/identityAuth/IdentityTokenUseCase";
import {JWTSigner} from "../../../services/Authorization/JWTSigner";
import {secret, verifyOptions, signOptions} from "../../../../../infra/jwt/config/config";
import container from "../../../../../infra/inversify/config/config";
import {ISigner} from "../../../services/Authorization/interfaces/ISigner";
import {TYPES} from "../../../../../infra/inversify/config/types";
import {IIdentityUserRepo} from "../../../repos/interfaces/IIdentityUserRepo";
import {UseCase} from "../../../../../core/domain/UseCase";
import {RegisterDTO} from "../../../useCases/register/RegisterDTO";
import {AuthDTO} from "../../../useCases/identityAuth/AuthDTO";
import {IdentityUser} from "../../../domain/IdentityUser";
import {IdentityTokenDTO} from "../../../useCases/identityAuth/IdentityTokenDTO";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    const registerUseCase = container.get<UseCase<RegisterDTO, Promise<RegisterUseCaseResponse>>>(TYPES.RegisterUseCase)
    await new RegisterController(registerUseCase).execute(req, res);
});

identityUserRouter.post('/token', async (req:Request, res: Response) => {
    const authUseCase = container.get<UseCase<AuthDTO, Promise<AuthResponse>>>(TYPES.AuthUseCase)
    const identityTokenUseCase = container.get<UseCase<IdentityUser, Promise<Result<IdentityTokenDTO>>>>(TYPES.IdentityTokenUseCase)
    await new TokenController(authUseCase, identityTokenUseCase).execute(req, res);
});



export {identityUserRouter};