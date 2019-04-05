import { user } from "./user";

export interface review {
    reviewdUser: user;
    createdBy: user;
    text: string;
    rating: string;
}