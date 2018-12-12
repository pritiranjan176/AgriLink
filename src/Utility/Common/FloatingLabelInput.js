import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
} from 'react-native';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }
  
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });


  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#aaa'],
      }),
    };
    return (
      <View style={{ paddingTop: 12 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 35, fontSize: 15, color: '#000' ,paddingVertical:5}}
          // , borderBottomWidth: 1, borderBottomColor: '#aaa' 
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          underlineColorAndroid = "transparent"
        />
      </View>
    );
  }
}