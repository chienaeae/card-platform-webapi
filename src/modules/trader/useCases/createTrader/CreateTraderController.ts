import * as express from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import {UseCase} from "../../../../core/domain/UseCase";
import {CreateTraderDTO} from "./CreateTraderDTO";
import {CreateTraderUseCaseResponse} from "./CreateTraderUseCase";
import {CreateTraderError} from "./CreateTraderError";

@injectable()
export class CreateTraderController extends BaseController {
    @inject(TYPES.IdentityAuthProvider)protected authProvider: AuthProvider;
    @inject(TYPES.CreateTraderUseCase)private readonly createTraderUseCase: UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const isAuth = await this.principal.isAuthenticated()
        if (!isAuth){
            return this.unauthorized()
        }
        try {
            const result = await this.createTraderUseCase.execute({
                userId: this.principal.details.userId
            })

            if(result.isLeft()){
                const error = result.value;
                switch (error.constructor){
                    case CreateTraderError.TraderAlreadyExists:
                        return this.conflict(error.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());

                }
            }else{
                return this.created(this.res);
            }
        } catch (err) {
            return this.fail((err as Error).message)
        }

    }
}