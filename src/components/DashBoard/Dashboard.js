import React, { Component,PureComponent } from "react"
import { View,AsyncStorage, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput, FlatList, ImageBackground ,Alert} from 'react-native'
// import { CheckBox } from 'react-native-elements'
import { Actions,ActionConst } from "react-native-router-flux";
import DashBoardCell from './DashBoardCell';
import LocalStorage from "../../Utility/Constants/LocalStorage";
import { TableNames } from "../../Utility/Constants/TableNames";
import {connect} from "react-redux";
import {getRouteList} from '../../Business/DashboardService/DashboardAction';
import HeaderAnimation from '../../Utility/Common/HeaderAnimation';

var currObj;
class Dashboard extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight:  <TouchableOpacity onPress={() => params.logoutBtn()} style={{marginRight:15,flexDirection:'row'}} >
                            <Image style={{width: 28, height: 28}}
                            source={require('../../imgs/logouticon.png')}
                            />
                        </TouchableOpacity>
        };
      };
    constructor(props) {
        super(props)
        this.state = {
            data: [{a:"1"},{a:"2"},{a:"3"}],
            refresh:''
        }
        currObj = this;
        

    }
    componentWillMount() {
        this.props.navigation.setParams({ logoutBtn: this.func_LogoutClicked });
        this.props.getRouteList()
    }

      func_LogoutClicked(){
          
        LocalStorage.func_removeData(TableNames.TOKEN)
        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => Actions.Login({type:ActionConst.RESET})},
            ],
            { cancelable: false }
          )
      }

    render() {
        return (
        <View style={{ flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground resizeMode='stretch' source={require('../../imgs/db.jpg')} style={styles.backgroundImage}>
        <View style={{flex:1,backgroundColor:'transparent'}}>
        <HeaderAnimation userName="Tanmaya Pradhan">
                <View style={{height:Dimensions.get('window').height,width:null,backgroundColor:'transparent'}}>
                    <FlatList contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
                        data={this.state.data}
                        numColumns={1}
                        key={1}
                        renderItem={({ item,index }) => <DashBoardCell index={index} key={item.ID} items={item}/>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </HeaderAnimation>
        </View>
        </ImageBackground>
            
        </View>
        )
    }
   
}
const mapStateToProps = ({dashboardReducer}) => {
    // email:auth.state.email;

    const {resp,error,loading} = dashboardReducer;

    return {resp,error,loading};
};

//all service call methods for login
export default connect(mapStateToProps, {
    getRouteList
})(Dashboard);
const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
    //   alignItems: 'center', justifyContent: 'center'
    //   resizeMode: 'cover', // or 'stretch'
    }
  });
