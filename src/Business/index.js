import { combineReducers } from 'redux';
// import DemoReducer from './DemoReducer';
import LoginReducer from '../Business/LoginService/LoginReducer';
import DashboardReducer from '../Business/DashboardService/DashboardReducer';
export default combineReducers({
    //  coool: () =>[]
    loginReducer: LoginReducer,
    dashboardReducer: DashboardReducer,
});