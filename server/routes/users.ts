import { Request, Response, Router } from "express";
import { UserRepository } from "../database/UserRepository";
import { UserLocationService } from "../services/userLocation"
import TransactionService from "../services/transactionService";

export default class UserController {
    public router: Router;
    public route: string = "/user";
    private userRepository: UserRepository = new UserRepository();
    private locationService: UserLocationService = new UserLocationService();
    private transactionService: TransactionService = new TransactionService();

    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.route}/:id`, (request: Request, response: Response) => this.getUser(request, response));
        this.router.get(`${this.route}/:location`, (request: Request, response: Response) => this.getUsersByLocation(request, response));
        this.router.post(this.route, (request: Request, response: Response) => this.createUser(request, response));
        this.router.post(`${this.route}/:id/rate`, (request: Request, response: Response) => this.rateUser(request, response));
        this.router.post(`${this.route}/ping`, (request: Request, response: Response) => this.pingUser(request, response));
    }
    async createUser(request: Request, response: Response) {
        let user = request.body.user;
        let result = await this.userRepository.create(user);
        let resultCode = result ? 200 : 400;
        response.status(resultCode);
    }
    async getUser(request: Request, response: Response) {
        let id = request.params.id;
        let user = await this.userRepository.findOne(id);
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
        response.send(200);
    }
    async pingUser(request: Request, response: Response) {
        let user = request.body.userId;
        await this.transactionService.pingUser(user);
        response.send(200);
    }
}