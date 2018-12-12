import React, { Component } from 'react';
import { AsyncStorage, View, Image, Animated,Platform } from 'react-native'
import { Scene, Router, Actions, Overlay, Stack, Lightbox, Modal } from 'react-native-router-flux';

import LoginComponent from './components/Login/LoginComponent';
import Dashboard from './components/DashBoard/Dashboard';
import ChangePassword from './components/Login/ChangePassword';
import ForgotPassword from './components/Login/ForgotPassword';
import MapPage from './components/Map/Map'
import SplashScreen from './SplashScreen';
import { UIColors } from './Utility/Constants/UIColor';



class RouterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: null,
        }

    }
    
    render() {

        return (

            <Router>
                {/* navigation bar style */}
                <Scene key='main'  navigationBarStyle={{ backgroundColor: UIColors.THEME_COLOR, borderBottomColor: 'transparent', borderBottomWidth: 1 }} titleStyle={{ color: '#000',alignSelf: Platform.OS === 'ios' ? 'center' : 'auto',}} backButtonTintColor='black'>
                    
                    <Scene key='SplashScreen' component={SplashScreen} title='' initial backTitle=" " hideNavBar></Scene>
                    
                    <Scene key='Login' component={LoginComponent} title='Login' backTitle=" " hideNavBar></Scene>
                    <Scene key='ChangePassword' backTitle=" "  component={ChangePassword} title='Change Password'></Scene>
                    <Scene key='ForgotPassword' backTitle=" "  component={ForgotPassword} title='Forgot Password'></Scene>
                    
                   
                    <Scene key="Dashboard"  left={null} backTitle=" "  titleStyle={{ color: 'white',alignSelf: 'center',marginLeft: Platform.OS === 'ios' ? null : 80}} component={Dashboard} title='Main Menu' duration={1} panHandlers={null}></Scene> 
                    <Scene key='MapPage' backTitle=" "component={MapPage} title='Outlets'></Scene>
                    
                   
                </Scene>
            </Router>


        );
    }


};

export default RouterComponent;
/*renderBackButton={() =>
<LeftButton
    leftButtonIcon={"arrow-back"}
    onLeft={() => Actions.pop()}
    leftButtonColor={"white"}
    leftButtonIconSize={30}
/>
}*/

//Drawer
// {/* <Drawer  key="drawer" contentComponent={DrawerContent} drawerImage={require('./img/menu.png')} drawerWidth={300} navigationBarStyle={{ backgroundColor: 'black',borderBottomColor: 'gray', borderBottomWidth: 1 }} titleStyle={{ color: 'white', alignSelf: 'center' }}>
// <Scene key= 'drawerMenu'hideNavBar panHandlers={null}>

//     {/* Drawer content item1 with its pages */}
//     <Stack key='demo' >
//         <Scene key='drawer1' component={Drawer1} title='Drawer1'></Scene>
//         <Scene back key='drawer1_1' component={Drawer1_1} title='Drawer1_1' backButtonTintColor='white' drawerLockMode= 'locked-closed'></Scene>
//     </Stack>
//     {/* Drawer content item1 with its pages closed*/}

//     <Stack key='demo2' >
//         <Scene key='drawer2' component={Drawer2} title='Drawer2'></Scene>
//     </Stack>
//     <Stack key='demo3' >
//         <Scene key='drawer3' component={Drawer3} title='Drawer3'></Scene>
//         <Scene back key='tab1_1' component={TabPage1_1} title='tab1_1'></Scene>
//     </Stack>

// </Scene>
// </Drawer> */}

// {/* <Overlay key='overlay'>
//             <Stack key ='modal' hideNavBar>
//                 {/* Login modules */}
//                 <Stack key="Login1" path="login/:data" titleStyle={{ alignSelf: 'center' }}>
//                     <Scene key ='Login' component={Login} title='Login' initial hideNavBar></Scene>
//                     {/* <Scene key ='register' component={Register} title='register'></Scene> */}
//                 </Stack>
//                 {/* Login modules closed*/}

//                 {/* related modules wrapper */}
//                 <Lightbox key='lightbox'>
//                     <Stack key='Main' hideNavBar titleStyle={{ alignSelf: 'center' }} backTitle=" " navigationBarStyle={{ backgroundColor: 'black',borderBottomColor: 'gray', borderBottomWidth: 1 }} titleStyle={{ color: 'white', alignSelf: 'center' }} backButtonTintColor='white'>

//                         {/* parent scene */}
//                         <Scene key ='Dashboard' hideNavBar={false} component={Dashboard} title='Main Menu' duration={1} panHandlers={null}></Scene>

//                         {/* child modules with its pages */}
//                         <Stack back key ='CoolingCalculation' >
//                             <Scene key ='CoolingCalculation' component={CoolingCalculation} title='COOLING CALCULATION' ></Scene>
//                             <Scene key ='CoolingInfo' component={ReduxSample} title='Cooling Info'></Scene>
//                         </Stack>
//                         <Stack back key ='Heating' >
//                             <Scene key ='Heating1' component={ReduxSample} title='Heating'></Scene>
//                             <Scene key ='HeatingInfo' component={ReduxSample} title='Heating Info'></Scene>
//                         </Stack>
//                         <Stack back key = 'CheckoutModule'>
//                             <Scene key = 'CheckOut' component={ReduxSample} title = "CheckOut Save" ></Scene>
//                             <Scene key = 'CheckOutReview' component={ReduxSample} title = "CheckOut Review" ></Scene>
//                         </Stack>
//                         {/* child modules with its pages closed*/}

//                     </Stack>
//                 </Lightbox>
//                 {/* related modules wrapper closed*/}

//                 {/* Drawer content items */}

//                 {/* Drawer content items closed */}

//             </Stack>
//         </Overlay> */}