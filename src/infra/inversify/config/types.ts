import {IdentityTokenUseCase} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";
import {TokenController} from "../../../modules/identityUser/useCases/identityAuth/TokenController";
import {RegisterController} from "../../../modules/identityUser/useCases/register/RegisterController";
import {IdentityAuthProvider} from "../../../modules/identityUser/useCases/identityAuth/IdentityAuthProvider";

const TYPES = {
    ISigner: Symbol.for("ISigner"),
    IIdentityUserRepo: Symbol.for("IIdentityUserRepo"),
    IdentityAuthProvider: Symbol.for("IdentityAuthProvider"),
    // Use Case
    RegisterUseCase: Symbol.for("RegisterUseCase"),
    AuthUseCase: Symbol.for("AuthUseCase"),
    IdentityTokenUseCase: Symbol.for("IdentityTokenUseCase"),
    // Controller
    TokenController: Symbol.for("TokenController"),
    RegisterController: Symbol.for("RegisterController")
};

export { TYPES };