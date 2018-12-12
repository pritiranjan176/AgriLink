import {Alert}from 'react-native'
import ApiAccess from '../../DataAccess/ApiAccess/ApiAccess';
import {URLPaths} from '../../Utility/Constants/URLPaths';
import {ReducerCaseNames} from '../../Utility/Constants/ReducerCaseNames';
export const getToken = ({email,password}) => {
        return async (dispatch) => {
            dispatch({type: 'loginLoader'});
            try {
                var params = 
                {
                User_Email: email,
                UserPassword: password, 
                Mobile: "m"
                }
                // var params = {
                //     UserName: email,
                //     Password: password,
                //     grant_type: 'password',
                //     scope: 'm'
                // };
                debugger;
                // let resp = await ApiAccess.post(token,params);
                let resp = {
                    Result : 'data'
                }
                let loginResp={
                    success: null,
                    error:null
                }
                if (resp.Result === "Error" || resp.Result === "Failed") {
                    Alert.alert(
                        "",
                        resp.Message == ""? "Something went wrong" : resp.Message,
                        [
                            {text: 'OK', onPress: () => console.log("error")},
                        ],
                        {cancelable: false}
                    );
                    
                    loginResp={
                        success: null,
                        error:resp.Message
                    }
                    dispatch({
                        type: ReducerCaseNames.loginRcKey,
                        payload: loginResp
                    });
                }
                else{
                    console.log("Login resp " + resp);
                    loginResp={
                        success: resp,
                        error:null
                    }
                
                    dispatch({
                         type: ReducerCaseNames.loginRcKey,
                         payload: loginResp
                     });
                }
               
               
            }catch (e){
                loginResp={
                    success: null,
                    error:e.message
                }
                dispatch({
                    type: ReducerCaseNames.loginRcKey,
                    payload: loginResp
                });
                // Alert.alert(
                //     "",
                //     e.message,
                //     [
                //         {text: 'OK', onPress: () => console.log("hi")},
                //     ],
                //     {cancelable: false}
                // );
               
            }
        }
    }

export const ChangeUserPassword = ({EmailId,oldPassword,newPassword}) => {
        //debugger;
            return async (dispatch) => {
                // dispatch({type: 'loginLoader'});
                try {
                    // searchParams: [oldPassword, newPassword, EmailId]
                    var params = {
                        currentPassword: oldPassword,   
                        newPassword: newPassword,  
                        emailId: EmailId
                    };
                    
                    let obj = await ApiAccess.post(URLPaths.changePassword,params);
                    
                    let resp = obj;
                    let chResp={
                        success: null,
                        error:null
                    }

                    if (resp.Result === "Error" || resp.Result === "Failed") {
                        Alert.alert(
                            "",
                            resp.Message == ""? "Something went wrong" : resp.Message,
                            [
                                {text: 'OK', onPress: () => console.log("error")},
                            ],
                            {cancelable: false}
                        );
                        chResp={
                            success: null,
                            error:resp.Message
                        }
                        dispatch({
                            type: ReducerCaseNames.changePassWordRcKey,
                            payload: chResp
                        });
                    }
                    else{
                        console.log("Login resp " + resp);
                        chResp={
                            success: resp,
                            error:null
                        }
                        dispatch({
                            type: ReducerCaseNames.changePassWordRcKey,
                            payload: chResp
                        });
                    }
                    
                   
                }catch (e){
                    let chResp={
                        success: null,
                        error:e.message
                    }
                    dispatch({
                        type: ReducerCaseNames.changePassWordRcKey,
                        payload: chResp
                    });
                    Alert.alert(
                        "",
                        e.message,
                        [
                            {text: 'OK', onPress: () => console.log("hi")},
                        ],
                        {cancelable: false}
                    );
                }
            }
        
        }

export const ForgotUserPassword = ({EmailId}) => {
        return async (dispatch) => {
            // dispatch({type: 'loginLoader'});
            try {
                var params = {
                    emailId: EmailId
                };
                //debugger;
                let obj = await ApiAccess.post(URLPaths.forgotPassword,params);
                //debugger;
                let resp = obj;
                let chResp={
                    success: null,
                    error:null
                }
                if (resp.Result === "Error" || resp.Result === "Failed") {
                    Alert.alert(
                        "",
                        resp.Message == ""? "Something went wrong" : resp.Message,
                        [
                            {text: 'OK', onPress: () => console.log("error")},
                        ],
                        {cancelable: false}
                    );
                    chResp={
                        success: null,
                        error:resp
                    }
                    dispatch({
                        type: ReducerCaseNames.forgotPassWordRcKey,
                        payload: resp
                    });
                }
                else{
                    console.log("Login resp " + resp);
                    chResp={
                        success: resp,
                        error:null
                    }
                    dispatch({
                         type: ReducerCaseNames.forgotPassWordRcKey,
                         payload: resp
                     });
                }
               
            }catch (e){
                let chResp={
                    success: null,
                    error:e.message
                }
                dispatch({
                     type: ReducerCaseNames.forgotPassWordRcKey,
                     payload: chResp
                 });
                Alert.alert(
                    "",
                    e.message,
                    [
                        {text: 'OK', onPress: () => console.log("hi")},
                    ],
                    {cancelable: false}
                );
            }
        }
    
    }

    export const generateOTP = ({mobNo}) => {
        debugger;
        return async (dispatch) => {
            // dispatch({type: REGISTER_FETCHING_DATA});
            try {
                debugger;
               let data = await ApiAccess.getWith_Auth('api/User/GenerateOTP?mobileNumber=' + mobNo)
               let resp = data;
               let otpResp = {
                success: null,
                error:null
                }
                if (resp.Result === "Error" || resp.Result === "Failed") {
                    Alert.alert(
                        "",
                        resp.Message == ""? "Something went wrong" : resp.Message,
                        [
                            {text: 'OK', onPress: () => console.log("error")},
                        ],
                        {cancelable: false}
                    );
                    otpResp={
                        success: null,
                        error:resp
                    }
                    dispatch({
                        type: ReducerCaseNames.generateOtpRcKey,
                        payload: resp
                    });
                    dispatch({
                        type: 'isSubmitBtnEnableRCKey',
                        payload: false
                    });
                }
                else{
                    console.log("otp resp " + resp);
                    otpResp={
                        success: resp,
                        error:null
                    }
                    dispatch({
                         type: ReducerCaseNames.generateOtpRcKey,
                         payload: resp
                     });
                     dispatch({
                        type: 'isSubmitBtnEnableRCKey',
                        payload: true
                    });
                }
               
                
            } catch (e) {
                let chResp={
                    success: null,
                    error:e.message
                }
                dispatch({
                     type: ReducerCaseNames.generateOtpRcKey,
                     payload: chResp
                 });
                 dispatch({
                    type: 'isSubmitBtnEnableRCKey',
                    payload: false
                });
                Alert.alert(
                    "",
                    e.message,
                    [
                        {text: 'OK', onPress: () => console.log("hi")},
                    ],
                    {cancelable: false}
                );
               
            }
        }
    
    }
    export const submitOTP = ({mobNo,otp}) => {
        debugger;
        return async (dispatch) => {
            // dispatch({type: REGISTER_FETCHING_DATA});
            try {
                // let data =  await getUserData();
                debugger;
               var params = {
                    grant_type: 'password',
                   username: mobNo,
                   password:otp
               };
                let data = await ApiAccess.postWith_Auth(URLPaths.submitOTP,params);
                let resp = data;
               let otpResp = {
                success: null,
                error:null
                }
                if (resp.Result === "Error" || resp.Result === "Failed") {
                    Alert.alert(
                        "",
                        resp.Message == ""? "Something went wrong" : resp.Message,
                        [
                            {text: 'OK', onPress: () => console.log("error")},
                        ],
                        {cancelable: false}
                    );
                    otpResp={
                        success: null,
                        error:resp
                    }
                    dispatch({
                        type: ReducerCaseNames.isOTPVerifiedRCKey,
                        payload: false
                    });
                    
                }
                else{
                    console.log("otp resp " + resp);
                    otpResp={
                        success: resp,
                        error:null
                    }
                    
                     dispatch({
                        type: ReducerCaseNames.isOTPVerifiedRCKey,
                        payload: true
                    });
                }
               
                
            } catch (e) {
                let chResp={
                    success: null,
                    error:e.message
                }
                dispatch({
                    type: ReducerCaseNames.isOTPVerifiedRCKey,
                    payload: false
                });
                Alert.alert(
                    "",
                    e.message,
                    [
                        {text: 'OK', onPress: () => console.log("hi")},
                    ],
                    {cancelable: false}
                );
               
            }
        }
    
    }