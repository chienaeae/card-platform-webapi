import {Container} from "inversify";
import "reflect-metadata";
import {TYPES} from "./types";
import {ISigner} from "../../../modules/identityUser/services/Authorization/interfaces/ISigner";
import {JWTSigner} from "../../../modules/identityUser/services/Authorization/JWTSigner";
import {IIdentityUserRepo} from "../../../modules/identityUser/repos/interfaces/IIdentityUserRepo";
import {IdentityUserRepo} from "../../../modules/identityUser/repos/IdentityUserRepo";
import {secret, signOptions, verifyOptions} from "../../jwt/config/config";
import * as Models from "../../sequlize/models"
import {UseCase} from "../../../core/domain/UseCase";
import {RegisterUseCase, RegisterUseCaseResponse} from "../../../modules/identityUser/useCases/register/RegisterUseCase"
import {RegisterDTO} from "../../../modules/identityUser/useCases/register/RegisterDTO";
import {AuthDTO} from "../../../modules/identityUser/useCases/identityAuth/AuthDTO";
import {AuthResponse, AuthUseCase} from "../../../modules/identityUser/useCases/identityAuth/AuthUseCase";
import {IdentityUser} from "../../../modules/identityUser/domain/IdentityUser";
import {Result} from "../../../core/logic/Result";
import {IdentityTokenDTO} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenDTO";
import {IdentityTokenUseCase} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";
import {AuthProvider, BaseController} from "../../../core/infra/BaseController";
import {IdentityAuthProvider} from "../../../modules/identityUser/useCases/identityAuth/IdentityAuthProvider";
import {TokenController} from "../../../modules/identityUser/useCases/identityAuth/TokenController";
import {RegisterController} from "../../../modules/identityUser/useCases/register/RegisterController";
import {CreateTraderController} from "../../../modules/trader/useCases/createTrader/CreateTraderController";
import {CreateTraderDTO} from "../../../modules/trader/useCases/createTrader/CreateTraderDTO";
import {
    CreateTraderUseCase,
    CreateTraderUseCaseResponse
}  from "../../../modules/trader/useCases/createTrader/CreateTraderUseCase";
import {TraderRepo} from "../../../modules/trader/repos/TraderRepo";
import {ITraderRepo} from "../../../modules/trader/repos/interfaces/ITraderRepo";
import {CreateCardDTO} from "../../../modules/card/useCases/createCard/CreateCardDTO";
import {
    CreateCardUseCase,
    CreateCardUseCaseResponse
} from "../../../modules/card/useCases/createCard/CreateCardUseCase";
import {CreateCardController} from "../../../modules/card/useCases/createCard/CreateCardController";
import {ICardRepo} from "../../../modules/card/repos/interfaces/ICardRepo";
import {CardRepo} from "../../../modules/card/repos/CardRepo";

const container = new Container();
container.bind<ISigner>(TYPES.ISigner).toDynamicValue(() => new JWTSigner(secret, verifyOptions, signOptions)).inSingletonScope();
container.bind<AuthProvider>(TYPES.IdentityAuthProvider).to(IdentityAuthProvider).inTransientScope();
// Repo
container.bind<ITraderRepo>(TYPES.TraderRepo).toDynamicValue(() => new TraderRepo(Models)).inTransientScope();
container.bind<IIdentityUserRepo>(TYPES.IdentityUserRepo).toDynamicValue(() => new IdentityUserRepo(Models)).inTransientScope();
container.bind<ICardRepo>(TYPES.CardRepo).toDynamicValue(() => new CardRepo(Models)).inTransientScope();
// UseCase
container.bind<UseCase<RegisterDTO, Promise<RegisterUseCaseResponse>>>(TYPES.RegisterUseCase).to(RegisterUseCase).inTransientScope();
container.bind<UseCase<AuthDTO, Promise<AuthResponse>>>(TYPES.AuthUseCase).to(AuthUseCase).inTransientScope();
container.bind<UseCase<IdentityUser, Promise<Result<IdentityTokenDTO>>>>(TYPES.IdentityTokenUseCase).to(IdentityTokenUseCase).inSingletonScope();
container.bind<UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>>(TYPES.CreateTraderUseCase).to(CreateTraderUseCase).inSingletonScope();
container.bind<UseCase<CreateCardDTO, CreateCardUseCaseResponse>>(TYPES.CreateCardUseCase).to(CreateCardUseCase).inSingletonScope();
// Controller
container.bind<BaseController>(TYPES.RegisterController).to(RegisterController).inTransientScope();
container.bind<BaseController>(TYPES.TokenController).to(TokenController).inTransientScope();
container.bind<BaseController>(TYPES.CreateTraderController).to(CreateTraderController).inTransientScope();
container.bind<BaseController>(TYPES.CreateCardController).to(CreateCardController).inTransientScope();

export default container;