import { Request, Response, Router, NextFunction } from "express";
import { TransactionRepository } from "../database/TransactionRepository";

export default class TransactionController {
   public router: Router;
   public route: string = "/transaction";
   public transactionRepository: TransactionRepository;

   constructor() {
      this.transactionRepository = new TransactionRepository();
      this.router = Router();
      this.initRoutes();
      this.getTransactionHistory = this.getTransactionHistory.bind(this)
   }
   initRoutes() {
      this.router.get(`${this.route}/:userId`, this.getTransactionHistory);
   }
   async getTransactionHistory(request: Request, response: Response, next: NextFunction) {
      console.log(next);
      console.log(this);
      const userId = request.params.userId;
      try {
         let transactions = await this.transactionRepository.findByUser(userId);
         response.send(transactions);
      }
      catch (err) {
         console.log(err);
      }
   }
}