import { Request, Response, Router } from "express";
import { UserRepository } from "../database/UserRepository";
import { ok, fail } from "assert";

const router: Router = Router();
const repository: UserRepository = new UserRepository();

router.post("/user/", async (request: Request, response: Response) => {
    let user = request.body.user;
    let result = await repository.create(user);

    if (result) {
        response.send(ok)
    }
    else {
        response.send(fail)
    }
});

router.get("/user/:id", (request: Request, response: Response) => {
    let id = request.body.id;
    let user = repository.findOne(id);
    response.send(user)
});

router.get("/user/:location", (request: Request, response: Response) => {
    var location = request.body.location;

    //find users in 2km radius to current user location
    var closeByUsers = await findUsersByLocation(location, 2);
    response.send(closeByUsers)
});


router.post("/user/:id/rate", (request: Request, response: Response) => {
    let rating = request.body.rating;
    let userId = request.body.user.id;
    await rateUser(userId, rating);
})


export { router };
