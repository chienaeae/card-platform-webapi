import {Server} from "./server/Server";
import dotenv from "dotenv";
const path = require('path')

dotenv.config({path: path.resolve(__dirname + '/config/.env')});

export class Launcher {
    private server: Server;

    public constructor() {
        this.server = new Server();
    }

    public launchApp() {
        this.server.startServer();
    }

}

new Launcher().launchApp();
