import ActionTypes from '../actions/ActionTypes';
import { _dealFetchResponse } from './util';

const _initState = () => ({
    weathers: [],
    test: []
})

const _errorState = () => ({
    weathers: "error"
})

export const weathers = (state = _initState(), action) => {
    switch (action.type) {
        case ActionTypes.LOAD_WEATHER_SUCCESS:
            console.log("LOAD_WEATHER_SUCCESS");
            return _dealFetchResponse(action.json);
        case ActionTypes.LOAD_WEATHER_FAIL:
            console.log("LOAD_WEATHER_FAIL");
            return _errorState();
        default:
            return state;
    }
};