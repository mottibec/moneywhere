const INITIAL_STATE = { data: [] };

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'fetch_data_success':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};