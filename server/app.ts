import express from "express";

class App {
    public app: express.Application;
    private port: number;

    constructor(controllers: any[], port: number) {
        console.log(`constructor`);
        this.app = express();
        this.port = port;
        this.configRoutes(controllers);
    }
    configRoutes(controllers: any[]) {
        console.log(`configRoutes ${controllers.length}`);
        controllers.forEach((controller) => {
            console.log(`${controller.route} registered`);
            this.app.use('/', controller.router);
        });
    }
    public listen() {
        const port = this.port;
        this.app.listen(port, function () {
            console.log(`app is listing on port ${port}`);
        });
    }
}

export default App;