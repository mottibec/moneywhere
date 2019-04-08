import { user } from "./user";

export interface transaction {
    id: string;
    fromUser: string;
    toUser: string;
    amount: number;
    currencyCode: string;
    onDate: Date
}