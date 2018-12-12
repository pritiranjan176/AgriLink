import {Alert}from 'react-native'
import ApiAccess from '../../DataAccess/ApiAccess/ApiAccess';
import {URLPaths} from '../../Utility/Constants/URLPaths';
import {ReducerCaseNames} from '../../Utility/Constants/ReducerCaseNames';
import DashboardService from './DashboardService';
export const getRouteList = () => {
        return async (dispatch) => {
            dispatch({type: 'loginLoader'});
            try {
                // 
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
                
                let routeListResp={
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
                    
                    routeListResp={
                        success: null,
                        error:resp.Message
                    }
                    dispatch({
                        type: ReducerCaseNames.routeList,
                        payload: routeListResp
                    });
                }
                else{
                    console.log("Login resp " + resp);
                    let ss = DashboardService.func_setData(resp)
                    routeListResp={
                        success: ss,
                        error:null
                    }
                
                    dispatch({
                         type: ReducerCaseNames.routeList,
                         payload: routeListResp
                     });
                }
               
               
            }catch (e){
                routeListResp={
                    success: null,
                    error:e.message
                }
                dispatch({
                    type: ReducerCaseNames.routeList,
                    payload: routeListResp
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