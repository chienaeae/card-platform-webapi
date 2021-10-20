import "reflect-metadata";
import {TYPES} from "../types";
import {ISigner} from "../../../reference/card-platform-library/src/modules/sequlize/models/identityUser/services/Authorization/interfaces/ISigner";
import {JWTSigner} from "../../../reference/card-platform-library/src/modules/sequlize/models/identityUser/services/Authorization/JWTSigner";
import {IIdentityUserRepo} from "../../../modules/identityUser/repos/interfaces/IIdentityUserRepo";
import {IdentityUserRepo} from "../../../modules/identityUser/repos/IdentityUserRepo";
import {UseCase} from "../../../core/domain/UseCase";
import {RegisterUseCase, RegisterUseCaseResponse} from "../../../modules/identityUser/useCases/register/RegisterUseCase"
import {RegisterDTO} from "../../../modules/identityUser/useCases/register/RegisterDTO";
import {AuthDTO} from "../../../modules/identityUser/useCases/identityAuth/AuthDTO";
import {AuthResponse, AuthUseCase} from "../../../modules/identityUser/useCases/identityAuth/AuthUseCase";
import {IdentityUser} from "../../../modules/identityUser/domain/IdentityUser";
import {Result} from "../../../core/logic/Result";
import {
    IdentityTokenUseCase,
    TokenResponseDTO
} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";
import {AuthProvider, BaseController} from "../../../core/infra/BaseController";
import {IdentityAuthProvider} from "../../../modules/identityUser/useCases/identityAuth/IdentityAuthProvider";
import {TokenController} from "../../../modules/identityUser/useCases/identityAuth/TokenController";
import {RegisterController} from "../../../modules/identityUser/useCases/register/RegisterController";
import {CreateTraderController} from "../../../modules/trader/useCases/createTrader/CreateTraderController";
import {CreateTraderDTO} from "../../../modules/trader/useCases/createTrader/CreateTraderDTO";
import {
    CreateTraderUseCase,
    CreateTraderUseCaseResponse
} from "../../../modules/trader/useCases/createTrader/CreateTraderUseCase";
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
import {IFetchTraderUseCase} from "../../../modules/cardOrdering/useCases/shared/interfaces/IFetchTraderUseCase";
import {FetchTraderUseCase} from "../../../modules/cardOrdering/useCases/shared/FetchTraderUseCase";
import {PlaceOrderController} from "../../../modules/cardOrdering/useCases/placeOrder/PlaceOrderController";
import {PlaceOrderUseCase} from "../../../modules/cardOrdering/useCases/placeOrder/PlaceOrderUseCase";
import {IPlaceOrderUseCase} from "../../../modules/cardOrdering/useCases/placeOrder/interfaces/IPlaceOrderUseCase";
import {ICardOrderRepo} from "../../../modules/cardOrdering/repos/interfaces/ICardOrderRepo";
import {CardOrderRepo} from "../../../modules/cardOrdering/repos/CardOrderRepo";
import {ICheckCardIndexUseCase} from "../../../modules/cardOrdering/useCases/shared/interfaces/ICheckCardIndexUseCase";
import {CheckCardIndexUseCase} from "../../../modules/cardOrdering/useCases/shared/CheckCardIndexUseCase";
import {GetOrdersController} from "../../../modules/cardOrdering/useCases/getOrders/GetOrdersController";
import {GetOrdersUseCase} from "../../../modules/cardOrdering/useCases/getOrders/GetOrdersUseCase";
import {IGetOrdersUseCase} from "../../../modules/cardOrdering/useCases/getOrders/interfaces/IGetOrdersUseCase";
import {secret, signOptions, verifyOptions} from "../../jwt/config/config";
import {Container} from "inversify";
import cardPlatformSequel from "../../sequlize/config/config";
import {config as orderingQueueConfig, InjectableOrderingQueueFIFOPublisher} from "../../sqs/config/config";
import {OrderingQueueFIFOPublisher} from "../../../reference/card-platform-library/src/modules/sqs/orderingQueueFIFO/OrderingQueueFIFOPublisher";
import {IOrderProcessUseCase} from "../../../modules/cardOrdering/useCases/shared/interfaces/IOrderProcessUseCase";
import {OrderProcessUseCase} from "../../../modules/cardOrdering/useCases/shared/OrderProcessUseCase";

const container = new Container();
container.bind<ISigner>(TYPES.ISigner).toDynamicValue(() => new JWTSigner(secret, verifyOptions, signOptions)).inSingletonScope();
container.bind<AuthProvider>(TYPES.IdentityAuthProvider).to(IdentityAuthProvider).inTransientScope();
container.bind<OrderingQueueFIFOPublisher>(TYPES.OrderingQueueFIFOPublisher).toDynamicValue(() => new InjectableOrderingQueueFIFOPublisher({...orderingQueueConfig})).inTransientScope();
// Repo
container.bind<ITraderRepo>(TYPES.TraderRepo).toDynamicValue(() => new TraderRepo(cardPlatformSequel.models.traderModel)).inTransientScope();
container.bind<IIdentityUserRepo>(TYPES.IdentityUserRepo).toDynamicValue(() => new IdentityUserRepo(cardPlatformSequel.models.identityUserModel)).inTransientScope();
container.bind<ICardRepo>(TYPES.CardRepo).toDynamicValue(() => new CardRepo(cardPlatformSequel.models.cardModel)).inTransientScope();
container.bind<ICardOrderRepo>(TYPES.CardOrderRepo).toDynamicValue(() => new CardOrderRepo(cardPlatformSequel.models.cardOrderModel)).inTransientScope();
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
container.bind<IOrderProcessUseCase>(TYPES.OrderProcessUseCase).to(OrderProcessUseCase).inSingletonScope();

// Controller
container.bind<BaseController>(TYPES.RegisterController).to(RegisterController).inTransientScope();
container.bind<BaseController>(TYPES.TokenController).to(TokenController).inTransientScope();
container.bind<BaseController>(TYPES.CreateTraderController).to(CreateTraderController).inTransientScope();
container.bind<BaseController>(TYPES.CreateCardController).to(CreateCardController).inTransientScope();
container.bind<BaseController>(TYPES.PlaceOrderController).to(PlaceOrderController).inTransientScope();
container.bind<BaseController>(TYPES.GetOrdersController).to(GetOrdersController).inTransientScope();


export default container;