import React, {Component} from 'react';
import {SafeAreaView,View,StatusBar,NativeModules, Platform} from 'react-native'
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './Business';

import Router from './Router';
import SplashScreen from './SplashScreen';
import { UIColors } from './Utility/Constants/UIColor';

class Main extends Component {

    render() {
        // let ss = NativeModules.RNRootViewBackground;
        debugger;
        if(Platform.OS === 'ios'){
            // NativeModules.RNRootViewBackground.setBackground(0, 0, 0,0.1)
        }
        else{
            // NativeModules.RNRootViewBackground.setBackground('black')
        }
        
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <SafeAreaView style={{flex:1,backgroundColor:UIColors.STATUSBAR_COLOR}}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <Router></Router>
                 </SafeAreaView>
               
            </Provider>
        );
    }
}

export default Main;