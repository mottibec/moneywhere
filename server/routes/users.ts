import { Request, Response, Router } from "express";
import { UserRepository } from "../database/UserRepository";
import { UserLocationService } from "../services/userLocation"

const router: Router = Router();
const repository: UserRepository = new UserRepository();
const locationService: UserLocationService = new UserLocationService();

router.post("/user/", async (request: Request, response: Response) => {
    let user = request.body.user;
    let result = await repository.create(user);

    if (result) {
        response.status(200);
    }
    else {
        response.status(400);
    }
});

router.get("/user/:id", (request: Request, response: Response) => {
    let id = request.body.id;
    let user = repository.findOne(id);
    response.send(user)
});

router.get("/user/:location", (request: Request, response: Response) => {
    var location = request.body.location;
    var closeByUsers = locationService.getUsersByLocation(location, 2);
    response.send(closeByUsers)
});


router.post("/user/:id/rate", async (request: Request, response: Response) => {
    let rating = request.body.rating;
    let userId = request.body.user.id;
    await repository.update();
})
export { router };
