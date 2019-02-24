import { user } from "./user";

export interface transaction {
    fromUser:user;
    toUser:user;
    amount:number;
    currencyCode:string;
    onDate:Date
}