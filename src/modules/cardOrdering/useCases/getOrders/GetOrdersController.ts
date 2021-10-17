import express from "express";
import {BaseController} from "../../../../core/infra/BaseController";
import {injectable} from "inversify";

@injectable()
export class GetOrdersController extends BaseController {
    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        return this.ok([{
            "price": 10.0,
            "type": "sell",
            "cardIndex": "4"
        }]);
    }

}