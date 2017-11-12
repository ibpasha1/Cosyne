import { Navigation } from 'react-native-navigation';
import { Component } from 'react';
import { registerScreens } from './screens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'cosyne.Home' // this is a registered name for a screen
    },
    {
      label: 'Two',
      screen: 'cosyne.Login', // iOS only
      title: 'Screen Two'
    }
  ]
});
