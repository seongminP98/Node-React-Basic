import {combineReducers} from 'redux';
import user from './user_reducer';   //user reducer이용할 때 사용

const rootReducer = combineReducers({   //combineReducers를 이용해서 root reducer에서 하나로 합쳐주는것.
    user

})

export default rootReducer;