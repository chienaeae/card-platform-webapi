import {App} from "./infra/http/app";
import * as dotenv from "dotenv";
dotenv.config();

export class Launcher {
    private server: App;

    public constructor() {
        this.server = new App();
    }

    public launchApp() {
        this.server.startServer();
    }

}

new Launcher().launchApp();
