import {IdentityTokenUseCase} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";
import {TokenController} from "../../../modules/identityUser/useCases/identityAuth/TokenController";
import {RegisterController} from "../../../modules/identityUser/useCases/register/RegisterController";
import {IdentityAuthProvider} from "../../../modules/identityUser/useCases/identityAuth/IdentityAuthProvider";
import {CreateTraderController} from "../../../modules/trader/useCases/createTrader/CreateTraderController";
import {CreateTraderUseCase} from "../../../modules/trader/useCases/createTrader/CreateTraderUseCase";
import {fork} from "child_process";
import {TraderRepo} from "../../../modules/trader/repos/TraderRepo";
import {CreateCardUseCase} from "../../../modules/card/useCases/createCard/CreateCardUseCase";
import {CreateCardController} from "../../../modules/card/useCases/createCard/CreateCardController";

const TYPES = {
    ISigner: Symbol.for("ISigner"),
    IdentityAuthProvider: Symbol.for("IdentityAuthProvider"),
    // Repo
    IdentityUserRepo: Symbol.for("IdentityUserRepo"),
    TraderRepo: Symbol.for("TraderRepo"),
    CardRepo:Symbol.for("CardRepo"),
    // Use Case
    RegisterUseCase: Symbol.for("RegisterUseCase"),
    AuthUseCase: Symbol.for("AuthUseCase"),
    IdentityTokenUseCase: Symbol.for("IdentityTokenUseCase"),
    CreateTraderUseCase: Symbol.for("CreateTraderUseCase"),
    CreateCardUseCase: Symbol.for("CreateCardUseCase"),
    // Controller
    TokenController: Symbol.for("TokenController"),
    RegisterController: Symbol.for("RegisterController"),
    CreateTraderController: Symbol.for("CreateTraderController"),
    CreateCardController: Symbol.for("CreateCardController")
};

export { TYPES };