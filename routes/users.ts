import express = require("express");

const router: express.Router = express.Router();

router.get("/user/:id", (request: express.Request, response: express.Response) => {
    response.send('Hello world!');
});

export { router };
