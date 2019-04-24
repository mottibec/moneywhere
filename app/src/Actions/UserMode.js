export const setMode = (first, second) => {
    return { type: 'set_user_mode', payload: { first, second } };
};

export const togglePingCards = visibility => {
    return { type: 'toggle_ping_cards', payload: visibility };
};