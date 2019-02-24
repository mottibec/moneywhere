import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/transactions/:userId", (request:Request, response: Response)  => {
    response.send('Hello world!');
});

export { router };