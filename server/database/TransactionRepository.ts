import { BaseRepository } from "./BaseRepository ";
import { transaction } from "../models/transaction";

export class TransactionRepository extends BaseRepository<transaction> {
    constructor() {
        console.log("TransactionRepository");
        super();
        this._items = [
            {
                id: "1",
                fromUser: "1",
                toUser: "2",
                currencyCode: "USD",
                onDate: new Date(),
                amount: 100,
            }];
    }
    find(item: transaction): Promise<transaction[]> {
        return Promise.resolve(this._items);
    }
    findOne(id: string): Promise<transaction> {
        const transaction = this._items.find(item => item.id === id);
        if (!transaction) {
            return Promise.reject();
        }
        return Promise.resolve(transaction);
    }

    findByUser(userId: string): Promise<transaction[]> {
        const items = this._items.filter(item => item.fromUser === userId || item.toUser === userId);
        console.log(items);
        return Promise.resolve(items);
    }
}