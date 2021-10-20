import express from "express";
import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import {inject, injectable} from "inversify";
import {GetOrdersResponseDTO, IGetOrdersUseCase} from "./interfaces/IGetOrdersUseCase";
import {TYPES} from "../../../../infra/inversify/types";
import {CardOrderingError} from "../shared/CardOrderingError";

@injectable()
export class GetOrdersController extends BaseController {
    @inject(TYPES.IdentityAuthProvider) protected authProvider: AuthProvider;
    @inject(TYPES.GetOrdersUseCase)private readonly getOrdersUseCase: IGetOrdersUseCase;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any | GetOrdersResponseDTO> {
        const isAuth = await this.principal.isAuthenticated()
        if (!isAuth) {
            return this.unauthorized()
        }
        try{
            const result = await this.getOrdersUseCase.execute({userId: this.principal.details.userId})
            if(result.isLeft()){
                const error = result.value;
                switch(error.constructor){
                    case CardOrderingError.TraderDoesntExist:
                        return this.clientError(result.value.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());

                }
            }
            return this.ok<GetOrdersResponseDTO>(result.value.getValue());
        }catch (err){
            return this.fail((err as Error).message)
        }
    }

}