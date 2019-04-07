import { user } from "./user";

export interface transaction {
    id: string;
    fromUser: user;
    toUser: user;
    amount: number;
    currencyCode: string;
    onDate: Date
}