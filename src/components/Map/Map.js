import React, { Component, PureComponent } from "react"
import {
    View, AsyncStorage, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, ActivityIndicator,
    Image, Dimensions, TextInput, FlatList, ImageBackground, Alert, PermissionsAndroid
} from 'react-native'
import { Actions, ActionConst } from "react-native-router-flux";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { getDistance } from '../../Business/CommonFunctions';
import { UIColors } from '../../Utility/Constants/UIColor';
import { Icon } from 'native-base'
import MapUi from '../../Utility/Constants/MapUi'
var currObj;

const ANCHOR = { x: 0.5, y: 0.5 };
const DeviceHeight = Dimensions.get("window").height
const DeviceWidth = Dimensions.get("window").width
const img = require('../../imgs/marker.png')

const SIZE = 20;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;
const colorOfmyLocationMapMarker = 'blue';
const PopupColor = "green"


export default class MapPage extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <TouchableOpacity onPress={() => params.currentOutlet()} style={{ marginRight: 15, flexDirection: 'row' }} >

            </TouchableOpacity>
        };
    };
    constructor(props) {
        super(props)
        this.mounted = false;
        this.state = {
            myPosition: null,
            distanceList: "",
            isNearStore: false,
            storeName: "",
            isloading: true,
            flex: 1
        };
        setTimeout(() => this.setState({ flex: 1 }), 2000);

        // this.plantPolygonLatLong = [

        //     // { latitude: 20.349862, longitude: 85.808736 },

        //     // { latitude: 20.349844, longitude: 85.807124 },

        //     // { latitude: 20.347958, longitude: 85.807211 },

        //     // { latitude: 20.347940, longitude: 85.808711 }
        //     { latitude: 20.242081, longitude: 85.788362 },
        //     { latitude: 20.243087, longitude: 85.787066 },

        //     { latitude: 20.242160, longitude: 85.787498 },

        //     { latitude: 20.243917, longitude: 85.786648 },

        //     { latitude: 20.245913, longitude: 85.785552 },


        // ];
        this.markers  = [
            {
                coordinate: { latitude: 20.243087, longitude: 85.787066 },
                key: "1",
            },
            {
                coordinate: { latitude: 20.242160, longitude: 85.787498 },
                key: "2",
            },
            {
                coordinate: { latitude: 20.243917, longitude: 85.786648 },
                key: "3",
            },
            {
                coordinate: { latitude: 20.242081, longitude: 85.788362 },
                key: "4",
            },
            {
                coordinate: { latitude: 20.349862, longitude: 85.808736 },
                key: "5",
            },
            {
                coordinate: { latitude: 20.349844, longitude: 85.807124 },
                key: "6",
            }

        ]
        this.shopLocation = [
            { latitude: 20.242081, longitude: 85.788362, name: "kaju" },
            { latitude: 20.243087, longitude: 85.787066, name: "A" },

            { latitude: 20.242160, longitude: 85.787498, name: "B" },

            { latitude: 20.243917, longitude: 85.786648, name: "C" },

            { latitude: 20.245913, longitude: 85.785552, name: "D" },
            // { latitude: 20.3488358, longitude: 85.8075324, name: "E" }
        ]

    }
    componentWillMount() {
        this.props.navigation.setParams({ currentOutlet: this.func_getCurrentOutlet });
    }
    func_getCurrentOutlet() {


    }
    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this._interval = setInterval(() => {
            // Your code
            if (Platform.OS === 'android') {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                    .then(granted => {
                        if (granted && this.mounted) this.watchLocation();
                    });
            } else {
                this.watchLocation();
            }
        }, 3000);
    }
    async watchLocation() {
        this.watchID = await navigator.geolocation.getCurrentPosition((position) => {
            // const myLastPosition = this.state.myPosition;
            const myPosition = position.coords;
            debugger;
            var dist = ""
            var isNear = false
            var storeName = ""
            debugger;

            for (let i = 0; i < this.shopLocation.length; i++) {

                dist = getDistance(myPosition.latitude, myPosition.longitude, this.shopLocation[i].latitude, this.shopLocation[i].longitude)
                if (dist < 0.010) {
                    isNear = true
                    storeName = this.shopLocation[i].name
                }
            }
            if (isNear) {
                this.setState({
                    isNearStore: true,
                    storeName: storeName
                })
            }
            else {
                if (this.state.isNearStore) {
                    this.setState({
                        isNearStore: false
                    })
                }
            }
            isNear = false
            this.setState({
                myPosition
            })

        }, err => {
            console.warn(JSON.stringify(err));
        },
            {
                timeout: 2000,
                maximumAge: 3600000,
                enableHighAccuracy: false,
                distanceFilter: 0,
                useSignificantChanges: true
            });
    }
    func_enterStore() {
        // alert("hii")
        this.setState({
            isNearStore: false,
            // storeName:storeName
        })
        Actions.DeliveryForm({ myPos: this.state.myPosition })
    }

    func_mapView() {
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            const myPosition = position.coords;
            this.setState({
                myPosition
            })
            let coOrd = [{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }];
            this.map.fitToCoordinates(coOrd);
        })
    }


    render() {
        let { heading, coordinate } = this.props;
        if (!coordinate) {
            const { myPosition } = this.state;
            if (!myPosition) return null;
            coordinate = myPosition;
            heading = myPosition.heading;
        }
        const rotate = `180deg`//(typeof heading === 'number' && heading >= 0) ? `${heading}deg` : null;
        debugger
        return (
            // <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            //     <ImageBackground source={require('../../imgs/demoback.jpg')} style={Styles.backgroundImage}>

            //     </ImageBackground>

            // </View>
            <View style={styles.container}>
                <View style={{ height: DeviceHeight, width: DeviceWidth }}>

                    <MapView
                        style={{ height: DeviceHeight, width: DeviceWidth }}
                        ref={map => {
                            this.map = map;
                        }}
                        initialRegion={{
                            latitude: this.state.myPosition == null ? 20.2961 : this.state.myPosition.latitude,
                            longitude: this.state.myPosition == null ? 85.8245 : this.state.myPosition.longitude,
                            // latitude: 20.3488358,
                            // longitude: 85.8075324,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0221,
                        }}
                        showsMyLocationButton= {false}
                        showsCompass
                        showsUserLocation
                        customMapStyle={MapUi}
                        followUserLocation
                        loadingIndicatorColor="red"
                        // region={this.state.mapRegion}
                        loadingEnabled
                        >

                        {this.markers.map(marker => (
                            <Marker

                                title={marker.key}
                                //image={img}
                                key={marker.key}
                                coordinate={marker.coordinate}
                            >
                                <Image
                                    style={{ height: 30, width: 30 }}
                                    source={img}
                                ></Image>
                            </Marker>
                        ))}
                        {/* {this.func_renderLocationPlygon()} */}

                    </MapView>
                    <TouchableOpacity onPress={() => this.func_mapView()} style={{ height: 50, width: 50, borderRadius: 25, position: 'absolute', right: 20, bottom: 100, zIndex: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon active style={{ color: "#3474ba", fontSize: 30 }} name="ios-locate-outline" />
                    </TouchableOpacity>
                    {this.renderEnterStoreView()}
                </View>

                {/* <View style={{ height: 150, width: 400, backgroundColor: "red", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>{this.state.distanceList}</Text>
                </View> */}
                {/* {this.func_renderLocationPlygon} */}
            </View>
        )
    }
    // func_renderLocationPlygon() {
    //     return (
    //         <Polyline

    //             // key={polygon.id}

    //             coordinates={this.plantPolygonLatLong}

    //             // holes={polygon.holes}

    //             strokeColor="#F00"
    //             // strokeColors={COLORS}
    //             // fillColor="rgba(255,0,0,0.2)"

    //             strokeWidth={2}

    //         />
    //     );
    // }

    renderEnterStoreView() {
        // alert(this.state.isNearStore)
        if (this.state.isNearStore) {
            return (
                <View style={{ height: DeviceHeight, width: DeviceWidth, backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 170, width: Dimensions.get("window").width - 100, borderRadius: 6, borderWidth: 5, backgroundColor: "#fff", elevation: 2, borderColor: UIColors.THEME_COLOR }}>
                        <View style={{ height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: UIColors.THEME_COLOR }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>STORE</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 19, fontWeight: '400', color: "black" }}>You are near at {this.state.storeName} store</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 35, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 7, backgroundColor: UIColors.THEME_COLOR }}
                                onPress={() => this.func_enterStore()}
                            >
                                <Text style={{ fontSize: 14, fontWeight: '300', color: '#fff' }}>Enter to Store</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return null;
        }
    }
}
// const Styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//         width: null,
//         height: null,
//         //   alignItems: 'center', justifyContent: 'center'
//         //   resizeMode: 'cover', // or 'stretch'
//     },
//     container: { flex: 1, backgroundColor: '#fff', height: Dimensions.get('window').height, width: null, margin: 10, borderRadius: 5 }
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
    },
    mapMarker: {
        zIndex: 1000,
    },
    // The container is necessary to protect the markerHalo shadow from clipping
    container: {
        width: HEADING_BOX_SIZE,
        height: HEADING_BOX_SIZE,
    },
    heading: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: HEADING_BOX_SIZE,
        height: HEADING_BOX_SIZE,
        alignItems: 'center',
    },
    headingPointer: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: ARROW_SIZE * 0.75,
        borderBottomWidth: ARROW_SIZE,
        borderLeftWidth: ARROW_SIZE * 0.75,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: "red",
        borderLeftColor: 'transparent',
    },
    markerHalo: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        width: HALO_SIZE,
        height: HALO_SIZE,
        borderRadius: Math.ceil(HALO_SIZE / 2),
        margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    marker: {
        justifyContent: 'center',
        backgroundColor: "green",
        width: SIZE,
        height: SIZE,
        borderRadius: Math.ceil(SIZE / 2),
        margin: (HEADING_BOX_SIZE - SIZE) / 2,
    },

});
