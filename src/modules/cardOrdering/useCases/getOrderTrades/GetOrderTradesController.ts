import express from "express";
import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {
    GetOrderTradeResponseDTO, GetOrderTradesQuery, IGetOrderTradesUseCase
} from "./interfaces/IGetOrderTradesUseCase";
import {PlaceOrderRequestDTO} from "../placeOrder/PlaceOrderRequestDTO";
import {CardOrderingError} from "../shared/CardOrderingError";
import {GetOrdersResponseDTO} from "../getOrders/interfaces/IGetOrdersUseCase";

@injectable()
export class GetOrderTradesController extends BaseController {
    @inject(TYPES.IdentityAuthProvider) protected authProvider: AuthProvider;
    @inject(TYPES.GetOrderTradesUseCase) private getOrderTradesUseCase: IGetOrderTradesUseCase;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any | GetOrderTradeResponseDTO> {
        const isAuth = await this.principal.isAuthenticated()
        if (!isAuth) {
            return this.unauthorized()
        }

        try{
            const result = await this.getOrderTradesUseCase.execute(req.query as GetOrderTradesQuery)
            if(result.isLeft()){
                const error = result.value;
                switch(error.constructor){
                    case CardOrderingError.CardIndexDoesntExist:
                        return this.clientError(result.value.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());
                }
            }
            return this.ok<GetOrderTradeResponseDTO>(result.value.getValue());
        }catch (err){
            return this.fail((err as Error).message)
        }
    }

}