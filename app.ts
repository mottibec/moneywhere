import express = require("express");

const app: express.Application = express();


app.listen(300, function () {
    console.log('app listening on port 3000!');
})