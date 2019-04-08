import { location } from "../models/location";
import { user } from "../models/user";
import { UserRepository } from "../database/UserRepository";

export class UserLocationService {
    private _userRepository: UserRepository = new UserRepository();

    private locations = [
        {
            id: "1",
            location: {
                latitude: 40.693451,
                longitude: -73.917007

            }
        },
        {
            id: "2",
            location: {
                latitude: 40.695839,
                longitude: -73.921831
            }
        },
        {

            id: "3",
            location: {
                latitude: 40.702899,
                longitude: -73.928379
            }
        },
        {
            id: "4",
            location: {
                latitude: 40.701891,
                longitude: -73.923305
            }
        },
        {
            id: "5",
            location: {
                latitude: 40.705730,
                longitude: -73.930383
            }
        },
        {

            id: "6",
            location: {
                latitude: 40.7063481,
                longitude: -73.920817
            }
        },
        {
            id: "7",
            location: {
                latitude: 40.707031,
                longitude: -73.915112
            }
        },
        {

            id: "8",
            location: {
                latitude: 40.708332,
                longitude: -73.933985
            }
        },
        {
            id: "9",
            location: {
                latitude: 40.709341,
                longitude: -73.920687
            }
        },
        {
            id: "10",
            location: {
                latitude: 40.706543,
                longitude: -73.921288
            }
        },
        {
            id: "11",
            location: {
                latitude: 40.693451,
                longitude: -73.914682
            }
        },
        {

            id: "12",
            location: {
                latitude: 40.707128,
                longitude: -73.921073
            }
        },
        {
            id: "13",
            location: {
                latitude: 40.711976,
                longitude: -73.912880
            }
        }
    ]
    getUsersByLocation(location: location, radius: number): user[] {
        let users = this._userRepository._items;
        const userLocatoins = users.map(user => {
            let userLocation = this.locations.find(location => location.id === user.id);
            if (userLocation) {
                user.location = userLocation.location;
            }
            return user;
        });
        return userLocatoins;
    }
}