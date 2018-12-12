import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions, TextInput } from 'react-native'

import { Actions } from "react-native-router-flux";
import {Loader} from '../../Utility/Common/Loader';
import Toast, {DURATION} from 'react-native-easy-toast';
import {ChangeUserPassword} from '../../Business/LoginService/LoginAction';
import {connect} from "react-redux";
import LoaderView from '../../Utility/Common/LoaderView';
import { UIColors } from "../../Utility/Constants/UIColor";

class ChangePassword extends Component{

    constructor(props) {
        super(props)
        this.state={
            userId:'',
            currPassword:'',
            newPassWord:'',
            confirmPassWord:'',
            isLoaderShow: false
        }
    }
    
    func_ChangePasswordClicked() {
        
                if ((this.state.userId != null && this.state.userId != "") && (this.state.currPassword != null && this.state.currPassword != "") && (this.state.newPassWord != null && this.state.newPassWord != "") && (this.state.confirmPassWord != null && this.state.confirmPassWord != "") ) {
                    let text = this.state.userId;
        
                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (reg.test(text) === false) {
                        this.refs.toast.show("Please enter a valid email id.");
                        return false;
                    }
                    else {
                        if (this.state.newPassWord == this.state.confirmPassWord) {
                            let EmailId = this.state.userId;  
                            let oldPassword = this.state.currPassword; 
                            let newPassword = this.state.newPassWord;
                            //debugger;
                            this.setState({isLoaderShow : true});
                            this.props.ChangeUserPassword({EmailId, oldPassword, newPassword});
                            //debugger;
                            // this.props.userRegister({registerData});
                        }
                        else {
                            this.refs.toast.show("New password and confirm password are not same.");
                            
                        }
                    }
        
                }
                else {
                    if (this.state.userId == null || this.state.userId == "") {
                        this.refs.toast.show("Please enter the email id.");
                        
                    }
                    else if (this.state.currPassword == null || this.state.currPassword == "") {
                        this.refs.toast.show("Please enter the current password.");
                    }
                    else if (this.state.newPassWord == null || this.state.newPassWord == "") {
                        this.refs.toast.show("Please enter the new password.");
                    }
                    else if (this.state.confirmPassWord == null || this.state.confirmPassWord == "") {
                        this.refs.toast.show("Please enter the confirm password.");
                    }
                }
        
            }
    componentWillReceiveProps = (nextProps) => {
        //debugger;
        this.setState({isLoaderShow : false});
        var resp = nextProps.resp1
        this.refs.toast.show(resp.msg);
        if(resp.state == 1) //state = 1 when successfully changed the PWD
        {
            Actions.popTo('Login');
        }
    }

    render() {
        //debugger;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
             <ImageBackground resizeMode='stretch' source = {require('../../imgs/pinkyelloginbg.jpg')} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
               
                    <View style={{ backgroundColor: "transparent", height: Dimensions.get('window').height, width: null }}>

                        {/* //top Logo view */}
                        <View style={{
                            marginLeft: 20, marginTop: 45,backgroundColor:"transparent",
                            marginRight: 20, height: 120, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image resizeMode="contain" source={require('../../imgs/agriLinkLogo.png')} style={{ height: 70, width: 260 }}>

                            </Image>
                        </View>

  {/* //center view */}
  <View style={{
                    backgroundColor: 'transparent', marginLeft: 20, marginTop: 20,
                    marginRight: 20, height: 300
                }}>
                    <View style={Styles.textInputWrapper}>
                        <TextInput placeholder='User ID' onChangeText={(text)=> this.setState({userId:text})}
                            ref = "UserID"
                            style={Styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize = 'none'
                            clearButtonMode = 'while-editing'
                            onSubmitEditing={(event) => {
                                this.refs.CurrentPassword.focus();
                              }}
                            >
    
                        </TextInput>
                        <View style={{ backgroundColor: 'black', height: 1 }}>
                        </View>
                    </View>
                    <View style={Styles.textInputWrapper}>
                        <TextInput placeholder='Current Password'  onChangeText={(text)=> this.setState({currPassword:text})}
                            ref = "CurrentPassword"
                            style={Styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize = 'none'
                            clearButtonMode = 'while-editing'
                            onSubmitEditing={(event) => {
                                this.refs.NewPassword.focus();
                              }}
                            >
    
                        </TextInput>
                        <View style={{ backgroundColor: 'black', height: 1 }}>
                        </View>
                    </View>
                    <View style={Styles.textInputWrapper}>
                        <TextInput placeholder='New Password'  onChangeText={(text)=> this.setState({newPassWord:text})}
                            ref = "NewPassword"
                            style={Styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize = 'none'
                            clearButtonMode = 'while-editing'
                            onSubmitEditing={(event) => {
                                this.refs.ConfirmPassword.focus();
                              }}
                            >
    
                        </TextInput>
                        <View style={{ backgroundColor: 'black', height: 1 }}>
                        </View>
                    </View>
                    <View style={Styles.textInputWrapper}>
                        <TextInput placeholder='ConfirmPassword'  onChangeText={(text)=> this.setState({confirmPassWord:text})}
                            ref = "ConfirmPassword"
                            style={Styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize = 'none'
                            clearButtonMode = 'while-editing'
                            >
    
                        </TextInput>
                        <View style={{ backgroundColor: 'black', height: 1 }}>
                        </View>
                    </View>
    
                    <View style={{ backgroundColor: 'red', height: 40, marginTop: 25 }}>
                        <TouchableOpacity onPress={()=>this.func_ChangePasswordClicked()} style={{
                            backgroundColor: UIColors.BTN_COLOR, flex: 1, alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'white', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 15 }}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
                        

                       
                    </View>
                    <Toast ref="toast"

                            style={{backgroundColor:'rgb(0,0,0)'}}
                            position='bottom'
                            positionValue={130}
                            fadeInDuration={100}
                            fadeOutDuration={200}
                            opacity={0.8}
                            textStyle={{color:'white'}}

                        />
                      
                </ScrollView>
                </ImageBackground>
                <LoaderView isLoaderShow={this.state.isLoaderShow}></LoaderView>
            </View>
        )
    }
}

const mapStateToProps = ({loginReducer}) => {
    // email:auth.state.email;
//debugger;
    const {resp1} = loginReducer;

    return {resp1};
};

//all service call methods for login
export default connect(mapStateToProps, {
    ChangeUserPassword
})(ChangePassword);

const Styles={
    textInputWrapper:{ backgroundColor: 'transparent', height: 40, marginTop: 15 },
    textInput:{ color: 'black', backgroundColor: 'transparent', flex: 1 }
}