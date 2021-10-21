import {App} from "./infra/http/app";
import * as dotenv from "dotenv";
import cardPlatformSequel from "./infra/sequlize/config/config";
import {orderingQueuePublisher} from "./infra/sqs/config/config";

dotenv.config();

export class Launcher {
    private server: App;

    public constructor() {
        this.server = new App();
    }

    public async launchApp() {
        const preCheckedResult = await cardPlatformSequel.authConnection() && await orderingQueuePublisher.authQueuesStatus()

        if(!preCheckedResult){
            process.exit(1);
        }

        this.server.startServer();
    }

}

new Launcher().launchApp();
