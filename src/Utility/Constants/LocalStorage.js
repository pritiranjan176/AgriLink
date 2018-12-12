import {AsyncStorage,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class LocalStorage{

    static async func_setStringData(tableName,data){
        await AsyncStorage.setItem(tableName,data);
    }
    static async func_getStringData(tableName){
        let stringifyData = await AsyncStorage.getItem(tableName);
        return stringifyData; 
    }
    static async func_removeData(tableName){
        AsyncStorage.removeItem(tableName);
    }
    static async func_setObjectData(tableName,data){
        await AsyncStorage.setItem(tableName,
        JSON.stringify(data));
    }
    static async func_getObjectData(tableName){
        let stringifyData = await AsyncStorage.getItem(tableName);
            let data = await JSON.parse(stringifyData) || [];
            return data;
    }


    // static async setToken(token){
    //     await AsyncStorage.setItem('Token',token);
    // }
    // static async getToken(){
    //     let stringifydata = await AsyncStorage.getItem('Token');
        
    //         return stringifydata;
    // }
    // static async clearToken() {
    //     await AsyncStorage.removeItem('Token');
    // }
    // static async setUserData(userData){
    //     await AsyncStorage.setItem('userData',
    //             JSON.stringify(userData));
    // }
    // static async getUserData(){
    //     let stringifydata = await AsyncStorage.getItem('userData');
    //         let data = await JSON.parse(stringifydata) || [];
    //         // debugger;
    //         return data;
    // }
    
    // static async setSalesManCacheObject(userData){
    //     await AsyncStorage.setItem('salesManCacheObject',
    //             JSON.stringify(userData));
    // }
    // static async getSalesManCacheObject(){
    //     let stringifydata = await AsyncStorage.getItem('salesManCacheObject');
    //         let data = await JSON.parse(stringifydata) || [];
    //         // debugger;
    //         return data;
    // }
}

// export async function setUserData (userData) {

//     await AsyncStorage.setItem('userData',
//         JSON.stringify(userData));
//     debugger;
// }
// export async function getUserData() {
//     let stringifydata = await AsyncStorage.getItem('userData');
//     let data = await JSON.parse(stringifydata) || [];
//     debugger;
//     return data;
// }
// export function  clearUserData() {
//     Alert.alert(
//         "",
//         "Are you sure you want to logout ?",
//         [
//             {text: 'Cancel', onPress: () =>  console.log("cancel"),style: 'cancel'},
//             {text: 'Yes', onPress: () => backToDashboard()},
//         ],
//         { cancelable: true }
//     )
// }
// function backToDashboard() {
//     AsyncStorage.removeItem('userData');
// }

// export async function clearUserDataByName(itemName) {
//     await AsyncStorage.removeItem(itemName);
//     debugger;
// }
// export async function setUserDataByName(itemName,data_to_set) {
//     await AsyncStorage.setItem(itemName,
//         JSON.stringify(data_to_set));
//     debugger;
// }
// export async function getUserDataByName(itemName) {
//     let stringifydata = await AsyncStorage.getItem(itemName);
//     let data = await JSON.parse(stringifydata) || [];
//     debugger;
//     return data;
// }
