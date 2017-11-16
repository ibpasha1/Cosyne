import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { registerScreens } from './screens';

registerScreens();

startOuterScope();

function startOuterScope(){
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'cosyne.Welcome', // unique ID registered with Navigation.registerScreen
      title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    }
  });
}

function startInnerScope(){
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'FUCK',
        screen: 'cosyne.Welcome', // iOS only
        title: 'Screen One'
      },
      {
        label: 'Two',
        screen: 'cosyne.Home' // this is a registered name for a screen
      },
      {
        label: 'Three',
        screen: 'cosyne.Login', // iOS only
        title: 'Login'
      }
    ]
  });
}
