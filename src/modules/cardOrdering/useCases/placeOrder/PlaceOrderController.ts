import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import express from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/config/types";
import {FetchTraderResponseDTO, IFetchTraderUseCase} from "../shared/interfaces/IFetchTraderUseCase";
import {Trader} from "../../../trader/domain/Trader";
import {PlaceOrderRequestDTO} from "./PlaceOrderRequestDTO";
import {UseCase} from "../../../../core/domain/UseCase";
import {IPlaceOrderUseCase, PlaceOrderDTO} from "./interfaces/IPlaceOrderUseCase";
import {PlaceOrderError} from "./PlaceOrderError";

@injectable()
export class PlaceOrderController extends BaseController {
    @inject(TYPES.IdentityAuthProvider) protected authProvider: AuthProvider;
    @inject(TYPES.PlaceOrderUseCase) private placeOrderUseCase: IPlaceOrderUseCase;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const isAuth = await this.principal.isAuthenticated()
        if (!isAuth) {
            return this.unauthorized()
        }
        const placeOrderRequestDTO: PlaceOrderRequestDTO = req.body as PlaceOrderRequestDTO;
        try {
            const result = await this.placeOrderUseCase.execute({
                ...placeOrderRequestDTO,
                userId: this.principal.details.userId
            })
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case PlaceOrderError.TraderDoesntExist:
                    case PlaceOrderError.CardIndexDoesntExist:
                        return this.clientError(result.value.errorValue().message)
                    default:
                        console.log(error.errorValue())
                        return this.fail(error.errorValue());
                }
            }
            return this.created(this.res);
        } catch (err) {
            return this.fail((err as Error).message)
        }
    }
}