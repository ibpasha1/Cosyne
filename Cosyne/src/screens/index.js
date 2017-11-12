import { Navigation } from 'react-native-navigation';

import Home from './home';
import Login from './login';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('cosyne.Home', () => Home);
  Navigation.registerComponent('cosyne.Login', () => Login);
}
