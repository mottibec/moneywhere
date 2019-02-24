import { balance } from "./balance";
import { review } from "./review";
import { transaction } from "./transaction";

export interface user {
    name: string;
    phone:string;
    email:string;
    balance:balance[];
    reviews:review[];
    transactions:transaction[];
}