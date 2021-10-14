import {IdentityTokenUseCase} from "../../../modules/identityUser/useCases/identityAuth/IdentityTokenUseCase";

const TYPES = {
    ISigner: Symbol.for("ISigner"),
    IIdentityUserRepo: Symbol.for("IIdentityUserRepo"),
    RegisterUseCase: Symbol.for("RegisterUseCase"),
    AuthUseCase: Symbol.for("AuthUseCase"),
    IdentityTokenUseCase: Symbol.for("IdentityTokenUseCase")
};

export { TYPES };