import ActionTypes from '../actions/ActionTypes';


export const loading = (state = "hidden", action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_LOADING_PAGE:
            console.log(state,"->TOGGLE_LOADING_PAGE");
            return state === "visible" ? "hidden" : "visible";
        default:
            return state;
    }
};