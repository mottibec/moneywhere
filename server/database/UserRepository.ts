import { BaseRepository } from "./BaseRepository ";
import { user } from "../models/user";

export class UserRepository extends BaseRepository<user> {
    find(item: user): Promise<user[]> {
        return Promise.resolve(this._items);
    }
    findOne(id: string): Promise<user> {
       const user = this._items.find(user => user.id == id);
       return Promise.resolve(user);
    }
}