import express from "express";
import * as userRoutes from "./routes/users";

const app: express.Application = express();

app.use("/", userRoutes.router);

app.listen(3000, function () {
    console.log('app listening on port 3000!');
})