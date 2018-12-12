import React, { Component,PureComponent } from 'react';
import { AsyncStorage, View, Image, Animated,Platform,ImageBackground } from 'react-native'
import LocalStorage from './Utility/Constants/LocalStorage';
import { Actions,ActionConst } from 'react-native-router-flux';
import LoaderView from './Utility/Common/LoaderView';
import { TableNames } from './Utility/Constants/TableNames';

export default class SplashScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            initial: null,
        }

    }
    

    componentWillMount(){
        this.func_getToken()
    }

    async func_getToken(){
        let tk = await LocalStorage.func_getStringData(TableNames.TOKEN)
       
        if(tk == null){
           
            Actions.Login({type:ActionConst.REPLACE})
        }
        else{
            
            Actions.Dashboard({type:ActionConst.REPLACE})
        }
        
    }

    render() {
        return (
            <ImageBackground source = {require('./imgs/pinkyelloginbg.jpg')} style={styles.backgroundImage}>
               
                 <Image  resizeMode="contain" source={require('./imgs/agriLinkLogo.png')} style={{ height: 70, width: 260 }} />
                 <View style={{height:100,backgroundColor:'transparent',position:'absolute',left:0,right:0,bottom:0}}>
                        <LoaderView isLoaderShow={true} backgroundColor="transparent"></LoaderView>
                </View>
            </ImageBackground>
        )
    }


};
const styles = {
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center', justifyContent: 'center'
    //   resizeMode: 'cover', // or 'stretch'
    }
  };


