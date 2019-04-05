import { Request, Response, Router } from "express";
import { TransactionRepository } from "../database/TransactionRepository";

const router: Router = Router();
const transactionsRepo: TransactionRepository = new TransactionRepository();

router.get("/transactions/:userId", async (request: Request, response: Response) => {
   var transactions = await transactionsRepo.findByUser(request.body.userId)
   response.send(transactions);
});

export { router };