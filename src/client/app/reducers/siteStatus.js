var initialState = {
    sync: false
}

const siteReady = () => {

}

export const siteStatus = (state = initialState, action) => {
    switch (action) {
        case 'SITE_STATUS_READY':
            var newState = Object.assign({}, state, {sync: true});
            return newState;
        case 'MSG_ALERT':

            return state;
        default:
            return state;
    }
}