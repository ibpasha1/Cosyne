import { Navigation } from 'react-native-navigation';

import Home from './home';
import Login from './login';
import Welcome from './welcome';
import TextFields from '../components/textfields';
import Register from './register';
import Dashboard from './dashboard';
import SocialMedia from './social_media';
import MediaProfile from './media_profile';
import Campaigns from './campaigns';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('cosyne.Welcome', () => Welcome);
  Navigation.registerComponent('cosyne.Home', () => Home);
  Navigation.registerComponent('cosyne.Login', () => Login);
  Navigation.registerComponent('cosyne.TextFields', () => TextFields);
  Navigation.registerComponent('cosyne.Register', () => Register);
  Navigation.registerComponent('cosyne.Dashboard', () => Dashboard);
  Navigation.registerComponent('cosyne.SocialMedia', () => SocialMedia);
  Navigation.registerComponent('cosyne.MediaProfile', () => MediaProfile);
  Navigation.registerComponent('cosyne.Campaigns', () => Campaigns);
}
