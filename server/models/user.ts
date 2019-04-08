import { location } from "./location";

export interface user {
    id: string;
    name: string;
    avatar: string;
    phone?: string;
    email?: string;
    rating: number;
    location: location;
}