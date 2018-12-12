import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions, TextInput } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast';
// import { CheckBox } from 'react-native-elements'
import { Actions } from "react-native-router-flux";
import LoaderView from '../../Utility/Common/LoaderView';
import {ForgotUserPassword,generateOTP,submitOTP} from '../../Business/LoginService/LoginAction';
import {connect} from "react-redux";
import { UIColors } from "../../Utility/Constants/UIColor";


class ForgotPassword extends Component{
    constructor(props) {
        super(props)
        this.state={
            userId:'',
            isLoaderShow: false,
         
        }
    }
   
    func_getOTP(){
        var mobNo = '';
        // this.props.generateOTP({mobNo})
    }
    func_resendOTP(){
        var mobNo = '';
        // this.props.generateOTP({mobNo})
    }
    func_submitBtnClicked(){
        var mobNo = '';
        var otp = '';
        // this.props.submitOTP({mobNo,otp})
    }
    func_ForgetPasswordClicked() {
       

    }
    componentWillReceiveProps = (nextProps) => {
        //debugger;
        this.setState({isLoaderShow : false});
        var resp = nextProps.forgotPwdResp
        this.refs.toast.show(resp.msg);
        if(resp.state == 1) //state = 1 when successfully changed the PWD
        {
            Actions.popTo('Login');
        }
    }

    render() {
        return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ImageBackground resizeMode='stretch' source = {require('../../imgs/pinkyelloginbg.jpg')} style={Styles.CONTAINER}>
            <ScrollView style={Styles.CONTAINER}>
          
                <View style={{ backgroundColor: "transparent", height: Dimensions.get('window').height, width: null }}>
        
                    {/* //top Logo view */}
                    <View style={Styles.LOGO_WRAPPER}>
                        <Image resizeMode="contain" source={require('../../imgs/agriLinkLogo.png')} style={{ height: 70, width: 260 }}/>
                    </View>
        
                {/* //center view */}
                <View style={Styles.CENTER_VIEW}>
                                <View style={{ backgroundColor: 'transparent',  marginTop: 0 }}>
                                    <Text>Please enter your Mobile Number below and click the Get OTP button. An OTP will be sent to your registered Mobile Number.</Text>
                                </View>
                                <View style={Styles.TXTINPUT_WRAPPER}>
                                    <TextInput placeholder='Mobile No.' onChangeText={(text)=> this.setState({userId:text})}
                                        style={Styles.TXTINPUT}
                                        underlineColorAndroid='transparent'
                                        autoCapitalize = 'none'
                                        clearButtonMode = 'while-editing'
                                        >
                                    </TextInput>
                                    <View style={Styles.SEPARATOR}/>
                                </View>
                                <View style={Styles.TXTINPUT_WRAPPER}>
                                    <TextInput placeholder='OTP' onChangeText={(text)=> this.setState({userId:text})}
                                        style={Styles.TXTINPUT}
                                        underlineColorAndroid='transparent'
                                        autoCapitalize = 'none'
                                        clearButtonMode = 'while-editing'
                                        >
                                    </TextInput>
                                    <View style={Styles.SEPARATOR}/>
                                </View>
                                <View style={Styles.GETOTP_WRAPPER}>
                                    <TouchableOpacity disabled={this.props.isSubmitBtnEnable ? true : false } onPress={()=> this.func_getOTP()} style={Styles.GETOTP_RESENDOTP_BTN}>
                                        <Text style={this.props.isSubmitBtnEnable ? Styles.DISABLED_OTP_BTN_TEXT : Styles.ENABLED_OTP_BTN_TEXT}>Get OTP</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={this.props.isSubmitBtnEnable ? false : true } onPress={()=> this.func_resendOTP()} style={[Styles.GETOTP_RESENDOTP_BTN,{alignItems:'flex-end'}]}>
                                        <Text style={this.props.isSubmitBtnEnable ? Styles.ENABLED_OTP_BTN_TEXT : Styles.DISABLED_OTP_BTN_TEXT}>Resend OTP</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity disabled={this.props.isSubmitBtnEnable ? false : true } onPress={()=>this.func_ForgetPasswordClicked()} style={this.props.isSubmitBtnEnable ? Styles.ENABLED_RESET_BTN : Styles.DISABLED_RESET_BTN} >
                                        <Text style={Styles.SUBMIT_BTN_TEXT}>SUBMIT</Text>
                                </TouchableOpacity>
                            
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
            {this.func_getChangePasswordView()}
            </ImageBackground>
            <LoaderView isLoaderShow={this.state.isLoaderShow}></LoaderView>
        </View>
        )   
        
    }
    func_getChangePasswordView(){
        if(this.props.isOtpVerified){ 
        return(
            <ImageBackground resizeMode='stretch' source = {require('../../imgs/pinkyelloginbg.jpg')} style={Styles.CHANGE_PWD_CONTAINER}>
                <ScrollView style={Styles.CONTAINER}>
                 <View style={{ backgroundColor: "transparent", height: Dimensions.get('window').height, width: null }}>
  
                    <View style={Styles.LOGO_WRAPPER}>
                        <Image resizeMode="contain" source={require('../../imgs/agriLinkLogo.png')} style={{ height: 70, width: 260 }}/>
                    </View>
                <View style={[Styles.CENTER_VIEW,{backgroundColor:'transparent',borderColor:'#fff',borderWidth:2,borderRadius:5,paddingHorizontal:10}]}>
                    <View style={Styles.TXTINPUT_WRAPPER}>
                        <TextInput placeholder='New Password' onChangeText={(text)=> this.setState({userId:text})}
                            style={Styles.TXTINPUT}
                            underlineColorAndroid='transparent'
                            autoCapitalize = 'none'
                            clearButtonMode = 'while-editing'
                        />
                                   
                        <View style={Styles.SEPARATOR}/>
                    </View>
                    <View style={Styles.TXTINPUT_WRAPPER}>
                        <TextInput placeholder='Confirm Password' onChangeText={(text)=> this.setState({userId:text})}
                                style={Styles.TXTINPUT}
                                underlineColorAndroid='transparent'
                                autoCapitalize = 'none'
                                clearButtonMode = 'while-editing'
                        />
                                   
                        <View style={Styles.SEPARATOR}/>
                    </View>
                    <TouchableOpacity  onPress={()=>this.func_ForgetPasswordClicked()} style={[Styles.ENABLED_RESET_BTN,{marginTop:40}]} >
                                        <Text style={Styles.SUBMIT_BTN_TEXT}>RESET PASSWORD</Text>
                    </TouchableOpacity>
                </View>
                </View>
                      
            </ScrollView>
            </ImageBackground>
        )
        }else{
            return null
        }
        
    }
}

const mapStateToProps = ({loginReducer}) => {
    const {forgotPwdResp,otpResp,isSubmitBtnEnable,isOtpVerified} = loginReducer;
//debugger;
    return {forgotPwdResp,otpResp,isSubmitBtnEnable,isOtpVerified};
};

//all service call methods for login
export default connect(mapStateToProps, {
    ForgotUserPassword,generateOTP,submitOTP
})(ForgotPassword);

const Styles={
    CONTAINER:{ flex: 1, backgroundColor: 'transparent' },
    LOGO_WRAPPER:{ marginLeft: 20, marginTop: 30,backgroundColor:"transparent", marginRight: 20, height: 120, justifyContent: 'center', alignItems: 'center' },
    SEPARATOR:{ backgroundColor: 'black', height: 1 },
    SUBMIT_BTN_TEXT:{ color: 'white', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 15 },
    ENABLED_RESET_BTN:{ backgroundColor: UIColors.BTN_COLOR, height: 40, marginTop: 25, alignItems: 'center', justifyContent: 'center' },
    DISABLED_RESET_BTN:{ backgroundColor: "#BBB", height: 40, marginTop: 25, alignItems: 'center', justifyContent: 'center' },
    CENTER_VIEW:{  backgroundColor: 'transparent', marginLeft: 20, marginTop: 30, marginRight: 20, height: 255 },
    TXTINPUT_WRAPPER:{ backgroundColor: 'transparent', height: 40, marginTop: 15 },
    GETOTP_WRAPPER:{backgroundColor: 'transparent', height: 40, marginTop: 15,flexDirection: 'row',justifyContent: 'space-between'},
    TXTINPUT:{ color: 'black', backgroundColor: 'transparent', flex: 1 },
    GETOTP_RESENDOTP_BTN:{height:30,width:100,backgroundColor:'transparent',justifyContent: 'center'},
    ENABLED_OTP_BTN_TEXT:{color: UIColors.BTN_COLOR, backgroundColor: 'transparent', fontWeight: '400', fontSize: 13},
    DISABLED_OTP_BTN_TEXT:{color: '#BBB', backgroundColor: 'transparent', fontWeight: '400', fontSize: 13},
    CHANGE_PWD_CONTAINER:{position: 'absolute',left:0,right:0,bottom:0,top: 0,backgroundColor: "rgba(0,0,0,0.2)"},
}