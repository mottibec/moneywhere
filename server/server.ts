import App from "./app";
import TransactionController from "./routes/transactions";
import UserController from "./routes/users";

const app = new App([
    new UserController(),
    new TransactionController()]
    , 3000);
app.listen();