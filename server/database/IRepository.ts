export interface IRepository<T> {

    create(item: T) : Promise<boolean>;

    update(item: T) : Promise<boolean>;

    find(item: T): Promise<T[]>;

    findOne(id: string): Promise<T>;
}