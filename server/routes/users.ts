import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/user/:id", (request: Request, response: Response) => {
    let id = request.body.id;
    let user = await getUserById(id);
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
