const INITIAL_STATE = { changeOrAtm: 1, sellOrBuy: 0, pingCardsVisible: false };

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'set_user_mode':
            return { ...state, changeOrAtm: action.payload.first, sellOrBuy: action.payload.second };
        case 'toggle_ping_cards': 
            return { ...state, pingCardsVisible: action.payload };
        default:
            return state;
    }
};