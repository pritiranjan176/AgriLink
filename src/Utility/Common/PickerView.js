import React, { Component } from "react"
import { View, Text, Picker, SegmentedControlIOS, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput, FlatList, ImageBackground, Linking, Modal } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import { Actions } from "react-native-router-flux";


export default class PickerView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: '',
      modalVisible: false
    }
    debugger;
    this.isVisible = false
    this.dataSource = this.props.dataSource
  }

  updateItem = (item) => {
    debugger;
    this.isVisible = false
    this.setState({
      user: item
    })
  }

  funcCancelClick = () => {
    this.isVisible = true
    // alert(this.state.modalVisible)
    this.setState({
      modalVisible: false
    })

    // alert(this.state.modalVisible)
  }

  // funcDoneClick = () =>{
  //   this.setState({
  //     modalVisible = false
  //   })
  // }



  render() {
    debugger;
    if (this.isVisible == false) {
      this.isVisible = this.props.visible ? this.props.visible : false
    }
    else {
      this.isVisible = false
    }

    return (
      <Modal
        style={{ flex: 1 }}
        animationType="none"
        transparent={true}
        visible={this.isVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.4 }}>

        </View>
        <View style={{ height: 250 }}>
          <View style={{ height: 40, backgroundColor: '#F9F9F9', justifyContent: 'space-between', flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginLeft: 10, justifyContent: 'center' }}
              onPress={this.funcCancelClick}
            >
              <Text style={styles.buttonTextStyle}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 10, justifyContent: 'center' }}
            // onPress={this.funcDoneClick}
            >
              <Text style={styles.buttonTextStyle}>
                Done
                    </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Picker
              selectedValue={this.state.user}
              onValueChange={this.updateItem}
              style={{ flex: 1, height: 35 }}
              itemStyle={{fontSize: 15}}
            >
              <Picker.Item label="Steve" value="steve" />
              <Picker.Item label="Ellen" value="ellen" />
              <Picker.Item label="Maria" value="maria" />
              <Picker.Item label="Steve1" value="steve1" />
              <Picker.Item label="Ellen1" value="ellen1" />
              <Picker.Item label="Maria1" value="maria1" />
            </Picker>
          </View>
        </View>
      </Modal>
    )
  }
}



const styles = StyleSheet.create({
  buttonTextStyle: { color: '#1173FF', fontSize: 16 },
})
