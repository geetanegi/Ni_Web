import { combineReducers } from 'redux'
import { RESET_STATE } from '../Action'


const appReducer = combineReducers({
    state: (state = {}) => state,
})

const clearReducer = (state, action) => {
    if (action.type === RESET_STATE) {
        state = undefined
        localStorage.removeItem('persist:root')
        return state
    }
    return appReducer(state, action)
}

export default clearReducer
