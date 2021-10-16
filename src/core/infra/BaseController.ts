import * as express from 'express';
import {injectable} from "inversify";

export interface Principal {
    details: any;

    isAuthenticated(): Promise<boolean>;

    isResourceOwner(resourceId: any): Promise<boolean>;

    isInRole(role: string): Promise<boolean>;
}

export interface AuthProvider {
    getUser(
        req: express.Request,
        res: express.Response
    ): Promise<Principal>
}

@injectable()
export abstract class BaseController {
    protected req?: express.Request;
    protected res?: express.Response;
    // 待重構
    // 為了在 controller 內取得使用者驗證結果 而暫時將 authProvider 耦合在 BaseController中，
    // 未來重構應將 router 包裝起來，並在 Middleware, AuthProvider, BaseController 中透過統一的 httpContext 存放
    // request, response 和 principal 資料。
    protected authProvider?: AuthProvider;
    protected principal?: Principal;

    protected abstract executeImpl(req: express.Request, res: express.Response
    ): Promise<void | any>;

    //待重構
    protected async executeAuth(req: express.Request, res: express.Response
    ):Promise<void>{
        if (!!this.authProvider == true) {
            this.principal = await this.authProvider.getUser(req, res);
        }
    }

    public async execute(req: express.Request, res: express.Response): Promise<void | any> {
        this.req = req;
        this.res = res;

        try {
            // 待重構
            await this.executeAuth(req, res);
            await this.executeImpl(req, res);
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`);
            console.log(err);
            this.fail('An unexpected error occurred')
        }
    }

    public static jsonResponse(
        res: express.Response, code: number, message: string
    ) {
        return res.status(code).json({message})
    }

    public ok<T>(dto?: T) {
        if (!!dto) {
            this.res.type('application/json');
            return this.res.status(200).json(dto);
        } else {
            return this.res.sendStatus(200);
        }
    }

    public created(res: express.Response) {
        return res.sendStatus(201);
    }

    public clientError(message?: string) {
        return BaseController.jsonResponse(this.res, 400, message ? message : 'Unauthorized');
    }

    public unauthorized(message?: string) {
        return BaseController.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
    }

    public notFound(message?: string) {
        return BaseController.jsonResponse(this.res, 404, message ? message : 'Not found');
    }

    public conflict(message?: string) {
        return BaseController.jsonResponse(this.res, 409, message ? message : 'Conflict');
    }

    public fail(error: Error | string) {
        console.log(error);
        return this.res.status(500).json({
            message: error.toString()
        })
    }
}