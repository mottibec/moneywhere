import express = require("express");

const router = express.Router();

router.get("/transactions/:userId", (request, response) => {
    response.send('Hello world!');
});
