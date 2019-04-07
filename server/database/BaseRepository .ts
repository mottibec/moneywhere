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

    abstract find(item: T): Promise<T[]>;
    abstract findOne(id:string): Promise<T>;
}