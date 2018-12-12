import React, { Component } from "react";
import { View, Text, Image } from 'react-native';


export default class NoDataFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
          a:""
          
        };

    }

    render(){
        if (this.props.isLoaderShow){
            return(
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
                <Text style={{}}>NO Data Found</Text>
                {/* <Image source={require('../../imgs/Loader.gif')} /> */}
            </View>
             
            );
        }else{
          
            return(
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white'}}>NO Data Found</Text>
                </View>
             
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


