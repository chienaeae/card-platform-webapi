import {OrderingQueueFIFOPublisher} from "../../reference/card-platform-library/src/modules/sqs/orderingQueueFIFO/OrderingQueueFIFOPublisher";
import {OrderProcessUseCase} from "../../modules/cardOrdering/useCases/shared/OrderProcessUseCase";
import {GetOrderTradesController} from "../../modules/cardOrdering/useCases/getOrderTrades/GetOrderTradesController";
import {GetCardsUseCase} from "../../modules/card/useCases/getCards/GetCardsUseCase";
import {GetCardsController} from "../../modules/card/useCases/getCards/GetCardsController";

const TYPES = {
    ISigner: Symbol.for("ISigner"),
    IdentityAuthProvider: Symbol.for("IdentityAuthProvider"),
    OrderingQueueFIFOPublisher: Symbol.for("OrderingQueueFIFOPublisher"),
    // Repo
    IdentityUserRepo: Symbol.for("IdentityUserRepo"),
    TraderRepo: Symbol.for("TraderRepo"),
    CardRepo:Symbol.for("CardRepo"),
    CardOrderRepo: Symbol.for("CardOrderRepo"),
    CardTradeRepo: Symbol.for("CardTradeRepo"),
    // Use Case
    RegisterUseCase: Symbol.for("RegisterUseCase"),
    AuthUseCase: Symbol.for("AuthUseCase"),
    IdentityTokenUseCase: Symbol.for("IdentityTokenUseCase"),
    CreateTraderUseCase: Symbol.for("CreateTraderUseCase"),
    CreateCardUseCase: Symbol.for("CreateCardUseCase"),
    FetchTraderUseCase: Symbol.for("FetchTraderUseCase"),
    PlaceOrderUseCase: Symbol.for("PlaceOrderUseCase"),
    CheckCardIndexUseCase: Symbol.for("CheckCardIndexUseCase"),
    GetOrdersUseCase: Symbol.for("GetOrdersUseCase"),
    OrderProcessUseCase: Symbol.for("OrderProcessUseCase"),
    GetOrderTradesUseCase: Symbol.for("GetOrderTradesUseCase"),
    GetCardsUseCase: Symbol.for("GetCardsUseCase"),
    // Controller
    TokenController: Symbol.for("TokenController"),
    RegisterController: Symbol.for("RegisterController"),
    CreateTraderController: Symbol.for("CreateTraderController"),
    CreateCardController: Symbol.for("CreateCardController"),
    PlaceOrderController: Symbol.for("PlaceOrderController"),
    GetOrdersController: Symbol.for("GetOrdersController"),
    GetOrderTradesController: Symbol.for("GetOrderTradesController"),
    GetCardsController: Symbol.for("GetCardsController")
};

export { TYPES };