import { IRepository } from "./IRepository";

export abstract class BaseRepository<T> implements IRepository<T>  {
    public _items: T[] = [];

    create(item: T): Promise<boolean> {
        this._items.push(item);
        return Promise.resolve(true);
    }

    update(item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    find(item: T): Promise<T[]> {

    }

    findOne(id: string): Promise<T> {
        let item = this._items.find(item => item.id == id);
        return Promise.resolve(item);
    }
}