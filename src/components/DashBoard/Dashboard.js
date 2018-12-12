import React, { Component, PureComponent } from "react"
import {Platform, Animated, BackHandler, View, AsyncStorage, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput, FlatList, ImageBackground, Alert } from 'react-native'
// import { CheckBox } from 'react-native-elements'
import { Actions, ActionConst } from "react-native-router-flux";
import DashBoardCell from './DashBoardCell';
import LocalStorage from "../../Utility/Constants/LocalStorage";
import { TableNames } from "../../Utility/Constants/TableNames";
import { connect } from "react-redux";
import { getRouteList } from '../../Business/DashboardService/DashboardAction';
import HeaderAnimation from '../../Utility/Common/HeaderAnimation';
import RNExitApp from 'react-native-exit-app';
import { getAppstoreAppVersion } from "react-native-appstore-version-checker";
import DeviceInfo from 'react-native-device-info';

let { width, height } = Dimensions.get('window');
var currObj;
class Dashboard extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <TouchableOpacity onPress={() => params.logoutBtn()} style={{ marginRight: 15, flexDirection: 'row' }} >
                <Image style={{ width: 28, height: 28 }}
                    source={require('../../imgs/logouticon.png')}
                />
            </TouchableOpacity>
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            data: [{ a: "1" }, { a: "2" }, { a: "3" }],
            refresh: '',
            backClickCount: 0,
            isAppUpdateRequire:false
        }
        currObj = this;
        this.springValue = new Animated.Value(50);
    }
    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.03 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });

    }

     componentWillMount() {
       
        this.props.navigation.setParams({ logoutBtn: this.func_LogoutClicked });
        this.props.getRouteList()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        var mobileAppVersion = DeviceInfo.getVersion() ? DeviceInfo.getVersion() : '';
        const appStoreId = ""
        const playStoreId = "com.reactstructure"
        const storeSpecificId = Platform.OS === "ios" ? appStoreId : playStoreId;
        // getAppstoreAppVersion(storeSpecificId) //put any apps packageId here
        //     .then(appVersion => {
        //         debugger
         
        //         console.log("clashofclans android app version on playstore", appVersion);
        //         if (parseFloat(appVersion) > parseFloat(mobileAppVersion)) {
                   
        //             this.setState({
        //                 isAppUpdateRequire: true
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         debugger
        //         console.log("error occurred", err);
        //     });
    }
   
    componentWillUnmount() {
        this.setState({
            isAppUpdateRequire: false
        })
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        this.state.backClickCount == 1 ? RNExitApp.exitApp() : this._spring();
        return true;
    };


    func_LogoutClicked() {

        LocalStorage.func_removeData(TableNames.TOKEN)
        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => Actions.Login({ type: ActionConst.RESET }) },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <ImageBackground resizeMode='stretch' source={require('../../imgs/db.jpg')} style={styles.backgroundImage}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <HeaderAnimation userName="Tanmaya Pradhan">
                            <View style={{ height: Dimensions.get('window').height, width: null, backgroundColor: 'transparent' }}>
                                <FlatList contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                                    data={this.state.data}
                                    numColumns={1}
                                    key={1}
                                    renderItem={({ item, index }) => <DashBoardCell index={index} key={item.ID} items={item} />
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </HeaderAnimation>
                    </View>
                    <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                        <Text style={styles.exitTitleText}>press back again to exit the app</Text>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => RNExitApp.exitApp()}
                        >
                            <Text style={styles.exitText}>Exit</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </ImageBackground>

            </View>
        )
    }

}
const mapStateToProps = ({ dashboardReducer }) => {
    // email:auth.state.email;

    const { resp, error, loading } = dashboardReducer;

    return { resp, error, loading };
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
    },
    animatedView: {
        width,
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
});
