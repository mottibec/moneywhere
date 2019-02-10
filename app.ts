import express = require("express");
import userRoutes = require("./routes/users");

const app: express.Application = express();

app.use("/", userRoutes);

app.listen(3000, function () {
    console.log('app listening on port 3000!');
})