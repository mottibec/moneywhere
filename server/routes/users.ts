import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/user/:id", (request: Request, response: Response) => {
    response.send('Hello world!');
});

export { router };
