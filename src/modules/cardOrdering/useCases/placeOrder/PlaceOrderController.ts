import {AuthProvider, BaseController} from "../../../../core/infra/BaseController";
import express from "express";

export class PlaceOrderController extends BaseController{
    protected authProvider: AuthProvider;
    protected executeImpl(req: express.Request, res: express.Response): Promise<any> {
        return Promise.resolve(undefined);

    }
}