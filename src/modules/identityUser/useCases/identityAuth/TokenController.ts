import {BaseController} from "../../../../core/infra/BaseController";
import express from "express";
import {Either, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {AuthDTO} from "../identityAuth/AuthDTO";
import {AuthUseCase} from "./AuthUseCase";
import {RegisterErrors} from "../register/RegisterError";
import {AuthErrors} from "./AuthError";


export class TokenController extends BaseController {
    private authUseCase: AuthUseCase;

    constructor(authUseCase: AuthUseCase) {
        super();
        this.authUseCase = authUseCase
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const dto: AuthDTO = req.body as AuthDTO;

        try{
            const result = await this.authUseCase.execute(dto)
            if(result.isLeft()){
                const error = result.value;
                switch(error.constructor){
                    case AuthErrors.EmailNotExists:
                        return this.clientError(error.errorValue().message)
                    case AuthErrors.PasswordNotMatches:
                        return this.clientError(error.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());
                }
            }else{
                return this.ok(this.res);
            }
        }catch(err) {
            return this.fail(err);
        }
    }

}