import{
    LOGIN_USER, REGISTER_USER
} from '../_actions/types';


export default function(state={}, action){     //state는 원본 state.
    switch (action.type) {
        case LOGIN_USER:
            return{...state,loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return{...state, register: action.payload}
            break;
        default:
            return state;
    }
}