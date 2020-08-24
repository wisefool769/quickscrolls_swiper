import { createStore } from 'redux';
import { TOGGLE_MUTE } from "./actions";

const initialState = {
    muted: true
}

function muteReducer(state, action) {
    switch(action.type) {
        case TOGGLE_MUTE:
            state.muted = !state.muted;
            return state;
        default:
            return state;
    }
}

let store = createStore(muteReducer, initialState)

export default store;