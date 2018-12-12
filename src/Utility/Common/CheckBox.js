import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
const CheckBox = props =>{
    debugger;
    var backgroundColor = props.backgroundColor ? props.backgroundColor : '#fff';
    var height = props.height ? props.height : 20;
    var width = props.width ? props.width : 20;
    var borderColor = props.borderColor ? props.borderColor : '#000';
    var borderWidth = props.borderWidth ? props.borderWidth : 1;
    var borderRadius = props.borderRadius ? props.borderRadius : 5;
    var iconSize = props.iconSize ? props.iconSize : 20;
    var checkedIconName = props.checkedIconName ? props.checkedIconName : "md-checkmark";
    //var unCheckedIconName = props.unCheckedIconName ? props.unCheckedIconName : "check";
    var iconColor = props.iconColor ? props.iconColor : "#000";
    var checked = props.checked;
    var onPress = props.onPress ? props.onPress : console.log('clicked');
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{backgroundColor:backgroundColor,height:height,width:width,borderColor:borderColor,borderWidth:borderWidth,borderRadius:borderRadius,justifyContent:'center',alignItems:'center'}}>
            {getCheckBoxIcon(checkedIconName,iconColor,iconSize,checked)}
        </TouchableOpacity>
    )
}

function getCheckBoxIcon(checkedIconName,iconColor,iconSize,checked){

    if(checked == true){
        return(
            
            <Icon name={checkedIconName} style={{fontSize: iconSize, color: iconColor}}/>
            // <Icon  name={checkedIconName} size={iconSize} color={iconColor} />
        )
    }
    else{
        return null
    }
    
}

export {CheckBox };