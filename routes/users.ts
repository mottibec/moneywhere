import express = require("express");

const router = express.Router();

router.get("/user/:id", (request, response) => {
    response.send('Hello world!');
});