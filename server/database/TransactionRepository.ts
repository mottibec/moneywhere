import { BaseRepository } from "./BaseRepository ";
import { transaction } from "../models/transaction";

export class TransactionRepository extends BaseRepository<transaction> {

    findByUser(userId: string) : Promise<transaction[]> {
        const items = this._items.filter(item => item.fromUser.id === userId || item.toUser.id === userId);
        return Promise.resolve(items);
    }
}