import { BaseRepository } from "./BaseRepository ";
import { user } from "../models/user";

export class UserRepository extends BaseRepository<user> {
  constructor() {
    super();
    this._items = [
      {
        name: "motti",
        id: "1",
        rating: 5,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.693451,
          longitude: -73.917007

        }
      },
      {
        name: "moshe",
        id: "2",
        rating: 4,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.695839,
          longitude: -73.921831
        }
      },
      {
        name: "david",
        id: "3",
        rating: 3,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.702899,
          longitude: -73.928379
        }
      },
      {
        name: "matt",
        id: "4",
        rating: 1,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.701891,
          longitude: -73.923305
        }
      },
      {
        name: "mojo",
        id: "5",
        rating: 2,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.705730,
          longitude: -73.930383
        }
      },
      {
        name: "nepton",
        id: "6",
        rating: 4,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.7063481,
          longitude: -73.920817
        }
      },
      {
        name: "dave",
        id: "7",
        rating: 3,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.707031,
          longitude: -73.915112
        }
      },
      {
        name: "jack",
        id: "8",
        rating: 2,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.708332,
          longitude: -73.933985
        }
      },
      {
        name: "mordechai",
        id: "9",
        rating: 5,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.709341,
          longitude: -73.920687
        }
      },
      {
        name: "sima",
        id: "10",
        rating: 5,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.706543,
          longitude: -73.921288
        }
      },
      {
        name: "sonya",
        id: "11",
        rating: 3,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.693451,
          longitude: -73.914682
        }
      },
      {
        name: "boris",
        id: "12",
        rating: 5,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.707128,
          longitude: -73.921073
        }
      },
      {
        name: "nave",
        id: "13",
        rating: 2,
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        location: {
          latitude: 40.711976,
          longitude: -73.912880
        }
      }
    ];
  }
  find(item: user): Promise<user[]> {
    return Promise.resolve(this._items);
  }
  findOne(id: string): Promise<user> {
    const user = this._items.find(user => user.id === id);
    if (!user) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }
}