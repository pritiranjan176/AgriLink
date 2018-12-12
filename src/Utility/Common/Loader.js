import React from 'react';
import { View, ActivityIndicator,Image } from 'react-native';

const Loader = ({size}) => {
    return(
        <View style = {styles.spinnerStyle}>
            {/* <ActivityIndicator
                size = { size || 'large' }
            /> */}
            {/* <Image source={require('../../imgs/Loader.gif')} /> */}
        </View>
    );
}

const styles = {
    spinnerStyle: {
        position:'absolute',left:0,right:0,bottom:0,top:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(255,255,255,0.1)'
    }
};
export { Loader };