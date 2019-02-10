import express = require("express");

const router: express.Router = express.Router();

router.get("/transactions/:userId", (request: express.Request, response: express.Response)  => {
    response.send('Hello world!');
});

export { router };