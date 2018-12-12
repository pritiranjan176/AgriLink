import React, { Component } from "react";
import { View, ActivityIndicator,Image } from 'react-native';
import { UIColors } from "../Constants/UIColor";


export default class LoaderView extends Component {

    static defaultProps = {
        isLoaderShow:false,
        backgroundColor:'#000'
    };

    constructor(props) {
        super(props);
        this.state = {
          a:""
          
        };

    }

    render(){
        const {isLoaderShow,backgroundColor} = this.props
        if (isLoaderShow){
            return(
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:backgroundColor,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator
                    size = { 'large' }
                    color={UIColors.LOADER_COLOR}
                />
                {/* <Image source={require('../../imgs/Loader.gif')} /> */}
            </View>
             
            );
        }else{
          
            return(
                null
             
            );
        }

        
    }
}

const styles = {
    spinnerStyle: {
        // position:'absolute',left:0,right:0,bottom:0,top:0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(255,255,255,0.1)'
    }
};


