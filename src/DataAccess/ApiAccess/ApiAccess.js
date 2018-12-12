import { Config } from '../../Utility/Constants/Config';
import { Actions, ActionConst } from "react-native-router-flux";
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
import LocalStorage from '../../Utility/Constants/LocalStorage';

class ApiAccess {


    static headers_get(tk) {
        return {
            'Authorization': tk

        }
    }

    static headers_postWithAuth(tk) {
        return {
            'Authorization': tk,
            'Content-Type': 'application/json'
        }
    }

    static headers_post() {
        return {
            // AUTHORIZATION: APIKEY_POST,
            'Content-Type': 'application/json'
        }
    }

    /*
    * Calling for GET method with Headers
    */
    static async getWith_Auth(api_path) {
        //  if(isInternetConnected()){
        debugger;
        let tk = await LocalStorage.getToken()

        const url = `${Config.BASE_URL + api_path}`;
        let options = Object.assign({ method: 'GET' }, null);
        options.headers = ApiAccess.headers_get(tk);
        return fetch(url, options).then(resp => {

            if (resp.status == 401) {

                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            }

            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });
        //  }

    }


    static async get(api_path, params) {
        let url = `${Config.BASE_URL + api_path}`;
        let formBody = [];
        debugger
        // Here we convert params to formBody format and store at fromBody list
        if (params !== null) {
            url = `${Config.BASE_URL + api_path}`;
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        }

        let options = Object.assign({ method: 'GET' }, params ? { body: formBody } : null);

        options.headers = null
        debugger

        //debugger;
        return fetch(url, options).then(resp => {
            if (resp.status == 401) {

                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            }

            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });
    }

    // Calling for POST method
    static post(api_path, params) {
        debugger;
        let url = `${Config.BASE_URL + api_path}`;
        let formBody = [];
        debugger;
        // Here we convert params to formBody format and store at fromBody list
        if (params !== null) {
            url = `${Config.BASE_URL + api_path}`;
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                var data = {encodedKey:encodedValue}
                formBody.append(data)
                // formBody.push(encodedKey + "=" + encodedValue);
            }
            // formBody = formBody.join("&");
        }
        debugger;

        let options = Object.assign({ method: 'POST' }, params ? { body: formBody } : null);


        //as params are being sent as rawdata
        // options.body = JSON.stringify(params)
        options.headers = ApiAccess.headers_post()

        debugger;
        return fetch(url, options).then(resp => {
            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });

    }

    // Calling for POST with auth method
    static async postWith_Auth(api_path, params) {
        debugger;
        let tk = await LocalStorage.getToken()
        let url = `${Config.BASE_URL + api_path}`;
        let formBody = [];
        // Here we convert params to formBody format and store at fromBody list
        if (params !== null) {
            url = `${Config.BASE_URL + api_path}`;
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        }

        let options = Object.assign({ method: 'POST' }, params ? { body: formBody } : null);
        options.headers = ApiAccess.headers_postWithAuth(tk);

        //as params are being sent as rawdata
        options.body = JSON.stringify(params)
        // options.headers = ApiAccess.headers_post()

        //debugger;
        return fetch(url, options).then(resp => {
            if (resp.status == 401) {

                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            }
            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });
        // return this.callingApiWith_Auth(api_path, params, 'POST');
    }

    static postForAuth(api_path, params) {
        debugger;
        let options = Object.assign({ method: "POST" });

        options.headers = {

            "Content-Type": "application/json"
        };

        options.body = params;
        const url = `${Config.BASE_URL + api_path}`;
        debugger;
        let respStatus = "";
        return fetch(url, options).then(resp => {
            //alert(resp.status);
            respStatus = resp.status;
            if (resp.status == 401) {

                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            } else if (resp.status === 400) {
                //  throw new Error('User id or password not match')
            } else {
                let list = resp._bodyText;
                let json = resp.json();
                if (resp.ok) {
                    if (resp)
                        return json;
                }
            }

            return json.then(err => {
                alert("error in")
                //throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                if (respStatus === 400) {
                    throw new Error('UserMissed')
                } else {
                    throw new Error('Please Check your Internet Connection ')
                }
            });
    }

    static async func_clearStorage() {
        await LocalStorage.clearToken()
    }

    // Calling for POST with auth method
    static async putWith_Auth(api_path, params) {
        debugger;
        let tk = await LocalStorage.getToken()
        let url = `${Config.BASE_URL + api_path}`;
        let formBody = [];
        // Here we convert params to formBody format and store at fromBody list
        if (params !== null) {
            url = `${Config.BASE_URL + api_path}`;
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        }

        let options = Object.assign({ method: 'PUT' }, params ? { body: formBody } : null);
        options.headers = ApiAccess.headers_postWithAuth(tk);

        //as params are being sent as rawdata
        options.body = JSON.stringify(params)
        // options.headers = ApiAccess.headers_post()

        //debugger;
        return fetch(url, options).then(resp => {
            if (resp.status == 401) {
                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            }
            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });
        // return this.callingApiWith_Auth(api_path, params, 'POST');
    }

    /*
* Calling for DELETE method with Headers
*/
    static async deleteWith_Auth(api_path) {
        debugger;
        let tk = await LocalStorage.getToken()

        const url = `${Config.BASE_URL + api_path}`;
        let options = Object.assign({ method: 'DELETE' }, null);
        options.headers = ApiAccess.headers_get(tk);
        return fetch(url, options).then(resp => {

            if (resp.status == 401) {

                this.func_clearStorage()
                Actions.LoginComponent({ type: ActionConst.RESET })
                alert("Session has expired");
                return;
            } else if (resp.status === 500) {
                Alert.alert(
                    "Ohoo!",
                    "Internal server error.!",
                    [
                        { text: 'OK', onPress: () => Actions.pop() },
                    ],
                    { cancelable: false }
                );
            }

            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => {
                throw new Error('Somthing went wrong, please try after some time.')
            });
        })
            .catch(e => {
                throw new Error('Please Check your Internet Connection ')
            });
    }

    //     // Calling for PUT method
    //     static put(route, params) {
    //         return this.xhr(route, params, 'PUT');
    //     }

    //     // Calling for DELETE method
    //     static delete(route, params) {
    //         return this.xhr(route, params, 'DELETE');
    //     }

    //     static callingApi(api_path, params, verb) {
    //         const url = `${Config.BASE_URL + api_path}`;
    //         let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);

    //         return fetch(url, options).then(resp => {
    //             let list = resp._bodyText
    //             let json = resp.json();
    //             if (resp.ok) {
    //                 return json
    //             }
    //             return json.then(err => {
    //                 throw err
    //             });
    //         });

    //     }

    //     static callingApiWith_Auth(api_path, params, verb) {
    // debugger;
    //         let url = `${Config.BASE_URL + api_path}`;
    //         let formBody = [];

    //         // Here we convert params to formBody format and store at fromBody list
    //         if (params !== null) {
    //             // url = `${Config.BASE_URL_POST + api_path}`;
    //             for (let property in params) {
    //                 let encodedKey = encodeURIComponent(property);
    //                 let encodedValue = encodeURIComponent(params[property]);
    //                 formBody.push(encodedKey + "=" + encodedValue);
    //             }
    //             formBody = formBody.join("&");
    //         }

    //         let options = Object.assign({method: verb}, params ? {body: formBody} : null);


    //         if (params !== null) {

    //             options.headers = ApiAccess.headers_post();
    //             options.headers = null
    //         } else {
    //             options.headers = ApiAccess.headers_get();
    //         }

    //         //debugger;
    //         return fetch(url, options).then(resp => {
    //             let list = resp._bodyText
    //             let json = resp.json();
    //             if (resp.ok) {
    //                 return json
    //             }
    //             return json.then(err => {
    //                 throw err
    //             });
    //         });

    //     }
}

export default ApiAccess;
