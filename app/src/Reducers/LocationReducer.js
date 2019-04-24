const INITIAL_STATE = { longitude: 0, latitude: 0 };

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'set_my_location':
            return { ...state, longitude: action.payload.longitude, latitude: action.payload.latitude };
        default:
            return state;
    }
};