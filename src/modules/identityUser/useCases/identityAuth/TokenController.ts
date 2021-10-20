import express from "express";
import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import {Result} from "../../../../core/logic/Result";
import {UseCase} from "../../../../core/domain/UseCase";
import {IdentityUser} from "../../domain/IdentityUser";
import {AuthDTO} from "./AuthDTO";
import {AuthResponse} from "./AuthUseCase";
import {AuthErrors} from "./AuthError";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {TokenResponseDTO} from "./IdentityTokenUseCase";


@injectable()
export class TokenController extends BaseController {
    @inject(TYPES.AuthUseCase) private authUseCase: UseCase<AuthDTO, Promise<AuthResponse>>;
    @inject(TYPES.IdentityTokenUseCase) private identityTokenUseCase: UseCase<IdentityUser, Promise<Result<TokenResponseDTO>>>

    async executeImpl(req: express.Request, res: express.Response): Promise<any | TokenResponseDTO> {
        const dto: AuthDTO = req.body as AuthDTO;
        try {
            const authResult = await this.authUseCase.execute(dto)
            if (authResult.isLeft()) {
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
            const identityUser: IdentityUser = authResult.value.getValue()
            const identityTokeResult = await this.identityTokenUseCase.execute(identityUser)
            if (identityTokeResult.isSuccess) {
                return this.ok(identityTokeResult.getValue());
            }

        } catch (err) {
            return this.fail(err);
        }
    }

}