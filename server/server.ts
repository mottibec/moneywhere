import App from "./app";
import TransactionController from "./routes/transactions";
import UserController from "./routes/users";

const app = new App([
    new UserController(),
    new TransactionController()]
    , 300);
app.listen();