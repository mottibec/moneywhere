import express from "express";
import * as userRoutes from "./routes/users";
import * as trasactionRouts from "./routes/transactions";

class App {
    public app: express.Application;
    private port: number;
    constructor(controllers: any[], port: number) {
        this.app = express();
        this.port = port;
        this.configRoutes(controllers);
    }
    configRoutes(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    public listen() {
        const port = this.port;
        this.app.listen(port, function () {
            console.log(`app is listing on port ${port}`);
        })
    }
}

export default App;