import {App} from "./infra/http/app";
import * as dotenv from "dotenv";
const path = require('path')

dotenv.config({path: path.resolve(__dirname + '/config/.env')});

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
