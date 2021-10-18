import "reflect-metadata";
import {TYPES} from "../../../reference/card-platform-library/src/infra/inversify/types";
import {ISigner} from "../../../reference/card-platform-library/src/modules/identityUser/services/Authorization/interfaces/ISigner";
import {JWTSigner} from "../../../reference/card-platform-library/src/modules/identityUser/services/Authorization/JWTSigner";
import {IIdentityUserRepo} from "../../../reference/card-platform-library/src/modules/identityUser/repos/interfaces/IIdentityUserRepo";
import {IdentityUserRepo} from "../../../reference/card-platform-library/src/modules/identityUser/repos/IdentityUserRepo";
import {UseCase} from "../../../reference/card-platform-library/src/core/domain/UseCase";
import {RegisterUseCase, RegisterUseCaseResponse} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/register/RegisterUseCase"
import {RegisterDTO} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/register/RegisterDTO";
import {AuthDTO} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/identityAuth/AuthDTO";
import {AuthResponse, AuthUseCase} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/identityAuth/AuthUseCase";
import {IdentityUser} from "../../../reference/card-platform-library/src/modules/identityUser/domain/IdentityUser";
import {Result} from "../../../reference/card-platform-library/src/core/logic/Result";
import {
    IdentityTokenUseCase,
    TokenResponseDTO
} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";
import {AuthProvider, BaseController} from "../../../reference/card-platform-library/src/core/infra/BaseController";
import {IdentityAuthProvider} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/identityAuth/IdentityAuthProvider";
import {TokenController} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/identityAuth/TokenController";
import {RegisterController} from "../../../reference/card-platform-library/src/modules/identityUser/useCases/register/RegisterController";
import {CreateTraderController} from "../../../reference/card-platform-library/src/modules/trader/useCases/createTrader/CreateTraderController";
import {CreateTraderDTO} from "../../../reference/card-platform-library/src/modules/trader/useCases/createTrader/CreateTraderDTO";
import {
    CreateTraderUseCase,
    CreateTraderUseCaseResponse
} from "../../../reference/card-platform-library/src/modules/trader/useCases/createTrader/CreateTraderUseCase";
import {TraderRepo} from "../../../reference/card-platform-library/src/modules/trader/repos/TraderRepo";
import {ITraderRepo} from "../../../reference/card-platform-library/src/modules/trader/repos/interfaces/ITraderRepo";
import {CreateCardDTO} from "../../../reference/card-platform-library/src/modules/card/useCases/createCard/CreateCardDTO";
import {
    CreateCardUseCase,
    CreateCardUseCaseResponse
} from "../../../reference/card-platform-library/src/modules/card/useCases/createCard/CreateCardUseCase";
import {CreateCardController} from "../../../reference/card-platform-library/src/modules/card/useCases/createCard/CreateCardController";
import {ICardRepo} from "../../../reference/card-platform-library/src/modules/card/repos/interfaces/ICardRepo";
import {CardRepo} from "../../../reference/card-platform-library/src/modules/card/repos/CardRepo";
import {IFetchTraderUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/shared/interfaces/IFetchTraderUseCase";
import {FetchTraderUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/shared/FetchTraderUseCase";
import {PlaceOrderController} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/placeOrder/PlaceOrderController";
import {PlaceOrderUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/placeOrder/PlaceOrderUseCase";
import {IPlaceOrderUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/placeOrder/interfaces/IPlaceOrderUseCase";
import {ICardOrderRepo} from "../../../reference/card-platform-library/src/modules/cardOrdering/repos/interfaces/ICardOrderRepo";
import {CardOrderRepo} from "../../../reference/card-platform-library/src/modules/cardOrdering/repos/CardOrderRepo";
import {ICheckCardIndexUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/shared/interfaces/ICheckCardIndexUseCase";
import {CheckCardIndexUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/shared/CheckCardIndexUseCase";
import {GetOrdersController} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/getOrders/GetOrdersController";
import {GetOrdersUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/getOrders/GetOrdersUseCase";
import {IGetOrdersUseCase} from "../../../reference/card-platform-library/src/modules/cardOrdering/useCases/getOrders/interfaces/IGetOrdersUseCase";
import * as Models from "../../sequlize/config/config"
import {secret, signOptions, verifyOptions} from "../../jwt/config/config";
import {Container} from "inversify";

const container = new Container();
container.bind<ISigner>(TYPES.ISigner).toDynamicValue(() => new JWTSigner(secret, verifyOptions, signOptions)).inSingletonScope();
container.bind<AuthProvider>(TYPES.IdentityAuthProvider).to(IdentityAuthProvider).inTransientScope();
// Repo
container.bind<ITraderRepo>(TYPES.TraderRepo).toDynamicValue(() => new TraderRepo(Models)).inTransientScope();
container.bind<IIdentityUserRepo>(TYPES.IdentityUserRepo).toDynamicValue(() => new IdentityUserRepo(Models)).inTransientScope();
container.bind<ICardRepo>(TYPES.CardRepo).toDynamicValue(() => new CardRepo(Models)).inTransientScope();
container.bind<ICardOrderRepo>(TYPES.CardOrderRepo).toDynamicValue(() => new CardOrderRepo(Models)).inTransientScope();
// UseCase
container.bind<UseCase<RegisterDTO, Promise<RegisterUseCaseResponse>>>(TYPES.RegisterUseCase).to(RegisterUseCase).inTransientScope();
container.bind<UseCase<AuthDTO, Promise<AuthResponse>>>(TYPES.AuthUseCase).to(AuthUseCase).inTransientScope();
container.bind<UseCase<IdentityUser, Promise<Result<TokenResponseDTO>>>>(TYPES.IdentityTokenUseCase).to(IdentityTokenUseCase).inSingletonScope();
container.bind<UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>>(TYPES.CreateTraderUseCase).to(CreateTraderUseCase).inSingletonScope();
container.bind<UseCase<CreateCardDTO, CreateCardUseCaseResponse>>(TYPES.CreateCardUseCase).to(CreateCardUseCase).inSingletonScope();
// Custom UseCase
container.bind<IPlaceOrderUseCase>(TYPES.PlaceOrderUseCase).to(PlaceOrderUseCase).inSingletonScope();
container.bind<IFetchTraderUseCase>(TYPES.FetchTraderUseCase).to(FetchTraderUseCase).inSingletonScope();
container.bind<ICheckCardIndexUseCase>(TYPES.CheckCardIndexUseCase).to(CheckCardIndexUseCase).inSingletonScope();
container.bind<IGetOrdersUseCase>(TYPES.GetOrdersUseCase).to(GetOrdersUseCase).inSingletonScope();
// Controller
container.bind<BaseController>(TYPES.RegisterController).to(RegisterController).inTransientScope();
container.bind<BaseController>(TYPES.TokenController).to(TokenController).inTransientScope();
container.bind<BaseController>(TYPES.CreateTraderController).to(CreateTraderController).inTransientScope();
container.bind<BaseController>(TYPES.CreateCardController).to(CreateCardController).inTransientScope();
container.bind<BaseController>(TYPES.PlaceOrderController).to(PlaceOrderController).inTransientScope();
container.bind<BaseController>(TYPES.GetOrdersController).to(GetOrdersController).inTransientScope();


export default container;