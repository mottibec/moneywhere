import { Request, Response, Router } from "express";
import { UserRepository } from "../database/UserRepository";
import { UserLocationService } from "../services/userLocation"

export default class UserController {
    private _router: Router;
    public route: string = "/user";
    private userRepository: UserRepository = new UserRepository();
    private locationService: UserLocationService = new UserLocationService();

    constructor() {
        this._router = Router();
    }
    initRoutes() {
        this._router.post(this.route, this.createUser);
        this._router.get(`${this.route}/:id`, this.getUser);
        this._router.get(`${this.route}/:location`, this.getUsersByLocation);
        this._router.post(`${this.route}/:id/rate`, this.rateUser);
    }
    async createUser(request: Request, response: Response) {
        let user = request.body.user;
        let result = await this.userRepository.create(user);
        let resultCode = result ? 200 : 400;
        response.status(resultCode);
    }
    getUser(request: Request, response: Response) {
        let id = request.body.id;
        let user = this.userRepository.findOne(id);
        response.send(user)
    }
    getUsersByLocation(request: Request, response: Response) {
        var location = request.body.location;
        var closeByUsers = this.locationService.getUsersByLocation(location, 2);
        response.send(closeByUsers)
    }
    rateUser(request: Request, response: Response) {
        let rating = request.body.rating;
        let userId = request.body.user.id;
        let user = {
            id: userId,
            rating: rating
        }
        await this.userRepository.update(user);
    }
}