import { Navigation } from 'react-native-navigation';

import Home from './home';
import Login from './login';
import TextFields from '../components/textfields';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('cosyne.Welcome', () => Welcome);
  Navigation.registerComponent('cosyne.Home', () => Home);
  Navigation.registerComponent('cosyne.Login', () => Login);
  Navigation.registerComponent('cosyne.TextFields', () => TextFields);
}
