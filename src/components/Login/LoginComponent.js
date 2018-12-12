import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput,AsyncStorage,Linking,Animated,ImageBackground } from 'react-native'
import { CheckBox } from "../../Utility/Common/CheckBox";
import { Actions,ActionConst } from "react-native-router-flux";
import {getToken} from '../../Business/LoginService/LoginAction';
import {connect} from "react-redux";
import {Loader} from '../../Utility/Common/Loader';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as Animatable from "react-native-animatable";
// import DeviceInfo from 'react-native-device-info';

import FilterData from '../../Utility/Constants/LocalStorage';
import LocalStorage from "../../Utility/Constants/LocalStorage";
import { TableNames } from "../../Utility/Constants/TableNames";
import { UIColors } from "../../Utility/Constants/UIColor";



class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            userId: '',
            password: '',
            bounceValue: new Animated.Value(100),
            appVersion:'',
            loading:false
        }

    }
    
    func_pressCheckBox = () => {
        this.setState((state) => ({
            checked: !state.checked,
        }));
    }

    async func_logIn_Click(){
        
        await LocalStorage.func_removeData(TableNames.USER_DATA)
        await LocalStorage.func_removeData(TableNames.TOKEN)
        
        let email = 'tanmaya'//this.state.userId;  
        let password = '123456'//this.state.password; 
        
        if(email == null || email == ''){
            this.refs.toast.show('Please enter the email id');
        }
        else if(password == null || password == ''){
            this.refs.toast.show('Please enter the password');
        }else{
           
            if(this.state.checked){
                this.func_setEmailId(email)
            }
            this.setState((state) => ({
                loading: true,
            }));
            this.props.getToken({email,password})
        
        }
        
       
    }

    componentDidMount = () => { 
        this.func_getEmailId()
    }
    async func_getEmailId() {
        let ss = await LocalStorage.func_getStringData(TableNames.EMAIL_ID)
        if (ss == null) {
            this.setState({ 
                userId: '',
                checked: false,
            });
        }
        else {
            
            this.setState({ 
                userId: ss.email ,
                checked: true,
            });
        }
    }
    
    async func_setEmailId (email) {
        await LocalStorage.func_setStringData(TableNames.EMAIL_ID,email)
    }
    
   
    
    componentWillReceiveProps = (nextProps) => {
        debugger;


        this.setState((state) => ({
            loading: false,
        }));
        
        if(nextProps.loading === false){
            if(nextProps.resp.success != null){
                let tk = "tk"
                // let tk = nextProps.resp.success
                this.setToken(tk);
            }
            else{
                this.refs.toast.show(nextProps.resp.error);
            }
            // if(nextProps.error !== null){
            //     this.refs.toast.show(nextProps.error);
            //     // alert(nextProps.error)
            // }
            // else if(nextProps.resp !== null){
            //     let tk = nextProps.resp
            //     this.setToken(tk);
            // }
        }
        
        //debugger;
    }

    async setToken (tk) {
       
        let token =  "tk"
        //tk.data.tokeyType+ " "+tk.data.accessToken
        // alert(token)
        await LocalStorage.func_setStringData(TableNames.TOKEN,tk)
        var userData={
            userInfo: "tk"
            //tk.data.userInfo
        }
        
        await LocalStorage.func_setObjectData(TableNames.USER_DATA,userData)
        Actions.Dashboard({type:ActionConst.RESET}) 
        }

    
    func_loginBtn(){
         return(
                <TouchableOpacity onPress={()=> this.func_logIn_Click()} style={{
                    backgroundColor: UIColors.BTN_COLOR, flex: 1, alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: 'white', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 15 }}>
                        Log In
                    </Text>
                </TouchableOpacity>
            )
        
    }

    func_visitUsOnTheWeb() {
        Linking.openURL("https://www.ers-cat.com/about-energy-rental-solutions.html");
    }
    func_GetLoader(){
        if(this.state.loading == true ){
            return <Loader size="large"/>
        }
        else{
            return null
        }
        
    }
    render() {
        //debugger;
        // this.state.appVersion = DeviceInfo.getVersion() ? DeviceInfo.getVersion() : '';
        this.state.appVersion = "1.0"
        return (
            
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                 <ImageBackground resizeMode='stretch' source = {require('../../imgs/pinkyelloginbg.jpg')} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
               
                    <View style={{ backgroundColor: "transparent", height: Dimensions.get('window').height, width: null }}>

                        {/* //top Logo view */}
                        
                        <View style={Styles.LogoWrapper}>
                        <Animatable.Image resizeMode="contain" animation="fadeInUpBig" delay={200} duration={500} source={require('../../imgs/agriLinkLogo.png')} style={{ height: 80, width: 260 }}> 
                           
                            </Animatable.Image>
                        </View>
                        
                        

                        {/* //center view */}
                        <View style={{
                            backgroundColor: 'transparent', marginLeft: 20, marginTop: 30,
                            marginRight: 20, height: 255
                        }}>
                        <Animatable.View animation="slideInLeft" duration={500}> 
                            <View style={Styles.textInputWrapper}>
                                <TextInput placeholder='User ID' onChangeText={(text)=>this.setState({ userId: text })}
                                    ref = "UserID"
                                    style={Styles.textInput}
                                    value={this.state.userId}
                                    keyboardType="email-address"
                                    underlineColorAndroid='transparent'
                                    clearButtonMode = 'while-editing'
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                    onSubmitEditing={(event) => {
                                        this.refs.Password.focus();
                                      }}
                                    >
                                    
                                </TextInput>
                                <View style={{ backgroundColor: 'black', height: 1 }}></View>
                            </View>
                            </Animatable.View>
                        
                        <Animatable.View animation="slideInLeft" delay={200} duration={500}> 
                            <View style={Styles.textInputWrapper}>
                                <TextInput placeholder='Password' onChangeText={(text)=>this.setState({ password: text })}
                                    ref = "Password"
                                    style={Styles.textInput}
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    clearButtonMode = 'while-editing'
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                    >
                                    
                                </TextInput>
                                <View style={{ backgroundColor: 'black', height: 1 }}>
                                </View>
                            </View>
                            </Animatable.View>
                            <View style={{ backgroundColor: 'transparent', height: 60, marginTop: 5,flexDirection:"row",alignItems:"center" }}>
                              
                                <CheckBox onPress={this.func_pressCheckBox}
                                        checked={this.state.checked}></CheckBox>
                                <Text style={{marginHorizontal:10}}>Save User ID</Text>
                                
                               
                            </View>
                            <Animatable.View animation="fadeInUpBig" delay={200} duration={500}> 
                            <View style={{ backgroundColor: 'transparent', height: 40, marginTop: 5 }}>
                                {this.func_loginBtn()}
                            </View>
                            </Animatable.View>
                            <View style={{ backgroundColor: 'transparent', height: 40, marginTop: 5, flexDirection: 'row' }}>
                                <View 
                                style={Styles.changeForgotBtnWrapper}>
                                    {/* <Text style={Styles.changeForgotBtn}>
                                        Forgot Password?
                                    </Text> */}
                                </View>
                                <TouchableOpacity onPress={()=>Actions.ForgotPassword()} 
                                style={Styles.changeForgotBtnWrapper}>
                                    <Text style={Styles.changeForgotBtn}>Forgot Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* //bottom view */}
                        <View style={{
                            position: "absolute", bottom: 22, left: 20, right: 20,
                            height: 40, justifyContent: 'flex-end',
                        }}>
                            <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <TouchableOpacity onPress={()=> this.func_visitUsOnTheWeb()}>
                                    <Text style={{ color: 'black' }}>Visit us on the web</Text>
                                </TouchableOpacity> */}
                                
                            </View>
                            <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, height: 20, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text style={{ color: 'black' }}>
                                    v{this.state.appVersion}
                                </Text>
                            </View>
                        </View>

                    </View>
                  

                        {this.func_GetLoader()}

                        <Toast ref="toast"

                            style={{backgroundColor:'rgb(0,0,0)'}}
                            position='bottom'
                            positionValue={80}
                            fadeInDuration={100}
                            fadeOutDuration={200}
                            opacity={0.8}
                            textStyle={{color:'white'}}

                        />
                        </ScrollView>
                        </ImageBackground>
            </View>
        )
    }

}

const mapStateToProps = ({loginReducer}) => {
    // email:auth.state.email;

    const {resp,error,loading} = loginReducer;

    return {resp,error,loading};
};

//all service call methods for login
export default connect(mapStateToProps, {
    getToken
})(LoginComponent);

const Styles={
    LogoWrapper:{marginLeft: 20, marginTop: 55,marginRight: 20, height: 120, justifyContent: 'center', alignItems: 'center',backgroundColor: 'transparent',},
    textInputWrapper:{ backgroundColor: 'transparent', height: 40, marginTop: 5 },
    textInput:{ color: 'black', backgroundColor: 'transparent', flex: 1 },
    changeForgotBtnWrapper:{ flex: 1, backgroundColor: 'transparent', alignItems: 'flex-end', justifyContent: 'center' },
    changeForgotBtn:{ color: UIColors.BTN_COLOR, backgroundColor: 'transparent', fontSize: 15 },
}
