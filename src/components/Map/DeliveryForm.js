/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class DeliveryForm extends Component {
  render() {
    alert(this.props.myPos)
    return (
      <View style={styles.container}>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#F5FCFF',
  },
 
});
