import {BaseController} from "../../../../core/infra/BaseController";
import express from "express";
import {Either, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {AuthDTO} from "../identityAuth/AuthDTO";
import {AuthResponse, AuthUseCase} from "./AuthUseCase";
import {RegisterErrors} from "../register/RegisterError";
import {AuthErrors} from "./AuthError";
import {IdentityTokenUseCase} from "./IdentityTokenUseCase";
import {IdentityUser} from "../../domain/IdentityUser";
import {IdentityTokenDTO} from "./IdentityTokenDTO";
import {UseCase} from "../../../../core/domain/UseCase";



export class TokenController extends BaseController {
    private authUseCase: UseCase<AuthDTO, Promise<AuthResponse>>;
    private identityTokenUseCase: UseCase<IdentityUser, Promise<Result<IdentityTokenDTO>>>

    constructor(authUseCase: UseCase<AuthDTO, Promise<AuthResponse>>, identityTokenUseCase: UseCase<IdentityUser, Promise<Result<IdentityTokenDTO>>>) {
        super();
        this.authUseCase = authUseCase
        this.identityTokenUseCase = identityTokenUseCase
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<any | IdentityTokenDTO>{
        const dto: AuthDTO = req.body as AuthDTO;

        try{
            const authResult = await this.authUseCase.execute(dto)
            if(authResult.isLeft()) {
                const error = authResult.value;
                switch (error.constructor) {
                    case AuthErrors.EmailNotExists:
                        return this.clientError(error.errorValue().message)
                    case AuthErrors.PasswordNotMatches:
                        return this.clientError(error.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());
                }
            }
            const identityUser : IdentityUser = authResult.value.getValue()
            const identityTokeResult = await this.identityTokenUseCase.execute(identityUser)
            if (identityTokeResult.isSuccess){
                return this.ok(this.res, identityTokeResult.getValue());
            }

        }catch(err) {
            return this.fail(err);
        }
    }

}