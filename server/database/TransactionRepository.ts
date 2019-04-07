import { BaseRepository } from "./BaseRepository ";
import { transaction } from "../models/transaction";

export class TransactionRepository extends BaseRepository<transaction> {
    find(item: transaction): Promise<transaction[]> {
        return Promise.resolve(this._items);
    }
    findOne(id: string): Promise<transaction> {
        const transaction = this._items.find(item => item.id === id);
        return Promise.resolve(transaction);
    }

    findByUser(userId: string): Promise<transaction[]> {
        const items = this._items.filter(item => item.fromUser.id === userId || item.toUser.id === userId);
        return Promise.resolve(items);
    }
}