import { Request, Response, Router } from "express";
import { TransactionRepository } from "../database/TransactionRepository";

export default class TransactionController {
   private _router: Router;
   public route: string = "/transaction";
   private transactionRepository: TransactionRepository = new TransactionRepository();
   constructor() {
      this._router = Router();
   }
   initRoutes() {
      this._router.get(`${this.route}/:userId`, this.getTransactionHistory);
   }
   async getTransactionHistory(request: Request, response: Response) {
      var transactions = await this.transactionRepository.findByUser(request.body.userId)
      response.send(transactions);
   }
}