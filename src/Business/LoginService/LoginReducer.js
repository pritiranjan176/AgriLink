
const INITIAL_STATE = {
    loading: false,
    email: '', password: '', 
    resp: {},resp1: null,
    error:null, error1:null,
    forgotPwdResp: null,
    otpResp:{},isSubmitBtnEnable:false,isOtpVerified: false,
};
import {ReducerCaseNames} from '../../Utility/Constants/ReducerCaseNames';
export default (state = INITIAL_STATE, action) => {
    //debugger;
    switch (action.type) {
            // case 'loginLoader': return {...state, resp: null,loading:true};
            case ReducerCaseNames.loginRcKey: return {...state, resp: action.payload, loading:false,error: null};
            case ReducerCaseNames.changePassWordRcKey: return {...state, resp1: action.payload};
            case ReducerCaseNames.forgotPassWordRcKey: return {...state, forgotPwdResp: action.payload};
            case ReducerCaseNames.generateOtpRcKey: return {...state, otpResp: action.payload};
            case 'isSubmitBtnEnableRCKey': return {...state, isSubmitBtnEnable: action.payload};
            case ReducerCaseNames.isOTPVerifiedRCKey: return {...state, isOtpVerified: action.payload};
            
            case 'error': return {...state, error: action.payload,loading:false,resp: null};
            
            default:
                return state;
        }
    }