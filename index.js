/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import Home from './src/Views/Home';
import Index from './src/Views/index';
import Login from './src/Views/Login';
import ProDuct from './src/Views/ProDuct';
import Cart from './src/Views/Cart';
import Regiter from './src/Views/Regiter';
import Mall from './src/Views/Mall';
import Todos from './src/TodoApp/TodoAppWithFirebaseStrore';
import Pay from './src/Views/Pay';
import Chat from './src/Views/Chat';



AppRegistry.registerComponent(appName, () => Index);
