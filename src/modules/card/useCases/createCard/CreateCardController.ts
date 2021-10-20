import {inject, injectable} from "inversify";
import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../../infra/inversify/types";
import {UseCase} from "../../../../core/domain/UseCase";
import {CreateCardDTO} from "./CreateCardDTO";
import {CreateCardUseCaseResponse} from "./CreateCardUseCase";
import express from "express";
import {CreateCardError} from "./CreateCardError";

@injectable()
export class CreateCardController extends BaseController {
    @inject(TYPES.IdentityAuthProvider) protected authProvider: AuthProvider;
    @inject(TYPES.CreateCardUseCase) private readonly createCardUseCase: UseCase<CreateCardDTO, CreateCardUseCaseResponse>;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const isAuth = await this.principal.isAuthenticated()
        if (!isAuth) {
            return this.unauthorized()
        }
        const dto: CreateCardDTO = req.body as CreateCardDTO
        try {
            const result = await this.createCardUseCase.execute(dto)
            if(result.isLeft()){
                const error = result.value;
                switch(error.constructor){
                    case CreateCardError.CardNameUsed:
                        return this.conflict(error.errorValue().message);
                    default:
                        console.log(error.errorValue());
                        return this.fail(error.errorValue());
                }

            }else{
                return this.created(this.res);
            }
        }catch (err){
            return this.fail(err)
        }

    }
}