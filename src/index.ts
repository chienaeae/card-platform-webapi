import {App} from "./infra/http/app";
import * as dotenv from "dotenv";
import cardPlatformSequel from "./infra/sequlize/config/config";
import {orderingQueuePublisher} from "./infra/sqs/config/config";

dotenv.config();

export class Launcher {
    private readonly server: App;

    public constructor() {
        this.server = new App();
    }

    public async launchApp() {
        const preCheckedResult = await cardPlatformSequel.authConnection() &&
            await orderingQueuePublisher.authQueuesStatus()
        if (!preCheckedResult) {
            process.exit(1);
        }
        this.server.startServer();
    }

    public async close() {
        await this.server.closeServer();
    }
}

async function main() {
    const launcher = new Launcher();
    await launcher.launchApp();
    const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    sigs.forEach(sig => {
        process.on(sig, async () => {
            setTimeout(() => {
                console.error(`Could not close connections in time, forcefully shutting down`);
                process.exit();
            }, 3000);
            try {
                console.info(`shutting down`);
                await launcher.close()
                await cardPlatformSequel.sequelInstance.close();
                console.info(`shut down successfully`);
                process.exit();
            } catch (err) {
                console.error(`closing with error occurred: ${err.message}`)
            }
        });
    })
}

main()




