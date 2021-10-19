import {App} from "./infra/http/app";
import * as dotenv from "dotenv";
import {authConnection} from "./infra/sequlize/config/config";

dotenv.config();

export class Launcher {
    private server: App;

    public constructor() {
        this.server = new App();
    }

    public async launchApp() {
        await authConnection()
        this.server.startServer();
    }

}

new Launcher().launchApp();
