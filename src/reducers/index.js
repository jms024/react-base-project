import { combineReducers } from 'redux';

const dataViewReducer = (state = 'list', {type, payload}) => {
    switch (type) {
        case 'SWITCH_VIEW':
            return payload;
        default:
            return state;
    }
}

export default combineReducers({
    dataViewReducer
})


