import {BaseController} from "../../../../core/infra/BaseController";
import express from "express";
import {RegisterDTO} from "./RegisterDTO";
import {RegisterUseCase} from "./RegisterUseCase";
import {RegisterErrors} from "./RegisterError";

export class RegisterController extends BaseController {
    private useCase: RegisterUseCase;

    constructor(useCase: RegisterUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const dto: RegisterDTO = req.body as RegisterDTO;

        try{
            const result = await this.useCase.execute(dto);

            if(result.isLeft()){
                const error = result.value;

                switch(error.constructor){
                    case RegisterErrors.AccountAlreadyExists:
                        return this.conflict(error.errorValue().message)
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