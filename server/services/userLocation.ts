import { location } from "../models/location";
import {user} from "../models/user";
import { UserRepository } from "../database/UserRepository";

export class UserLocationService {
    private _userRepository: UserRepository = new UserRepository();
    
    getUsersByLocation(location : location, radius: number) : user[] {
        let users  = this._userRepository._items;
        return users;
    }
}