
const INITIAL_STATE = {loading: false,email: '', password: '', resp: {},resp1: null,error:null, error1:null,forgotPwdResp: null};
import {ReducerCaseNames} from '../../Utility/Constants/ReducerCaseNames';
export default (state = INITIAL_STATE, action) => {
    //debugger;
    switch (action.type) {
            // case 'loginLoader': return {...state, resp: null,loading:true};
            case ReducerCaseNames.routeList: return {...state, resp: action.payload, loading:false,error: null};
          
            case 'error': return {...state, error: action.payload,loading:false,resp: null};
            
            default:
                return state;
        }
    }