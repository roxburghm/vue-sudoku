import LS from '@/lib/localStorage.js';

function setBoolean(stateVar, lsKey) {
    return function(state, payload) {
        state[stateVar] = payload;
        LS.setBoolean(lsKey, payload);
    }
}

function setString(stateVar, lsKey) {
    return function(state, payload) {
        state[stateVar] = payload;
        LS.setString(lsKey, payload);
    }
}

function setInt(stateVar, lsKey) {
    return function(state, payload) {
        state[stateVar] = payload;
        LS.setInt(lsKey, payload);
    }
}

export default {
    setBoolean,
    setInt,
    setString
}