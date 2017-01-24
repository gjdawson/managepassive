export const rooms = (state = {}, action) => {
    switch(action.type) {
        case 'REGISTER_ROOM':
            let t = {[action.room.id]: action.room};
            return Object.assign({}, state, t);
        default:
            return state;
    }
}