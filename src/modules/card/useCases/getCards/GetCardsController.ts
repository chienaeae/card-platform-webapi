import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import express from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {ICardRepo} from "../../repos/interfaces/ICardRepo";
import {GetCardsResponseDTO, IGetCardsUseCase} from "./interfaces/IGetCardsUseCase";
import {GetOrderTradeResponseDTO} from "../../../cardOrdering/useCases/getOrderTrades/interfaces/IGetOrderTradesUseCase";

@injectable()
export class GetCardsController extends BaseController {
    @inject(TYPES.GetCardsUseCase) private getCardsUseCase: IGetCardsUseCase;

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any | GetCardsResponseDTO> {
        try {
            const result = await this.getCardsUseCase.execute();
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    default:
                        return this.fail(error.errorValue());
                }
            }
            return this.ok<GetCardsResponseDTO>(result.value.getValue());
        } catch (err) {
            return this.fail((err as Error).message)
        }
    }
}