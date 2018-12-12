import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput, FlatList, ImageBackground } from 'react-native'

import { Actions } from "react-native-router-flux";
import { Icon } from 'native-base';


import Ripple from 'react-native-material-ripple';
import { UIColors } from "../../Utility/Constants/UIColor";
export default class DashBoardCell extends Component {
    static defaultProps = {
        routeName:'Route ',
        fromTo:'CRP to PATIA',
        progress:'50%',
        index:0
    };
    constructor(props) {
        super(props)
        this.state = {
            progress: 50,
            ColorHolder:'#fff'
        }

    }
    
    func_toNavigateMapPage(){
       
        Actions.MapPage()
    }
    componentWillMount() {
        this.func_ChangeColorFunction()
    }
    func_ChangeColorFunction() {
        var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        this.setState({
            ColorHolder: ColorCode
        })
    }

    render() {
        const {routeName,fromTo,index} = this.props
        const barWidth = Dimensions.get('screen').width -84-100-10-10
        
        return (
            <Ripple style={Styles.container} onPress={()=> this.func_toNavigateMapPage()} rippleColor = '#ddd' rippleOpacity={0.87}>
                {/* <View key='left View' style={{width:3,backgroundColor:this.state.ColorHolder}}/> */}
                <View key='center view' style={{flex:1,backgroundColor:'transparent'}}>
                    <View style={Styles.textWrapper}>
                        <Text style={Styles.textStyle}>{routeName}{index + 1}</Text>
                    </View>
                    <View style={Styles.textWrapper2}>
                        <View style={{height:30,width:30,backgroundColor:"transparent",marginHorizontal:5,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{height:24,width:24}} source={require('../../imgs/route.png')}></Image>
                        </View>
                        <Text style={Styles.textStyle2}>{fromTo}</Text>
                    </View>
                </View>
                <View key='right View' style={Styles.rightView}>
                    <View style={{height:40,width:40,borderRadius:20,backgroundColor:"#ddd",borderWidth:2,borderColor:"#ccc",justifyContent:'center',alignItems:'center'}}>
                        <Icon name='ios-arrow-forward' style={{fontSize: 20, color: '#000'}}/>
                    </View>
                </View>
            </Ripple>
        )
    }
}

const Styles={
    container:{ flex: 1, backgroundColor: '#fff', borderColor: '#E3B0F3',
        borderRadius: 5, borderWidth: 2, marginLeft: 10, marginRight: 10, marginTop: 10, height: 80,flexDirection: 'row',
    },
    textStyle:{fontFamily:'Arial',fontSize:15,fontWeight:'400',marginHorizontal:10,color: "#999"},
    textStyle2:{fontFamily:'Arial',fontSize:13,fontWeight:'400',color: "#000"},
    textWrapper:{flex:1,backgroundColor:'transparent',justifyContent:'center'},
    textWrapper2:{flex:1,backgroundColor:'transparent',alignItems:'center',flexDirection: 'row',},
    rightView:{width:70,backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}
}
