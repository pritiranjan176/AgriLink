import React, { Component } from "react";
import {View,Text,TouchableOpacity,TouchableWithoutFeedback } from "react-native";

import * as Animatable from "react-native-animatable";

const Modal = props => {
  var visible = props.visible ? props.visible : false;

  var animation = props.animation ? props.animation : "fadeInUpBig";

  var onPress = props.onPress ? props.onPress : console.log("clicked");

  var duration = props.duration ? props.duration : 500;

  var backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : "rgba(0,0,0,0)";

  if (visible) {
    return (
      <Animatable.View
        animation={animation}
        duration={duration}
        style={[Styles.container,{backgroundColor: backgroundColor}]}
      >
        <TouchableWithoutFeedback
          style={Styles.child}
          onPress={onPress}
        >
          {props.children}
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  } else {
    return null;
  }
};
const Styles={
    container:{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      child:{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "transparent"
      }
}
export { Modal };

