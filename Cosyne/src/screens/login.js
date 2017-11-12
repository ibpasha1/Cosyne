import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { setTheme, MKColor } from 'react-native-material-kit';
// customize the material design theme
setTheme({
  primaryColor: MKColor.Purple,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});

var TextFields = require('../components/textfields');

class Login extends Component {
  render(){
    return (
      <ScrollView style={styles.list} contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => {
          this.props.navigator.push({
            title: undefined,
            screen: "cosyne.TextFields"
          });
        }}>
          <Text style={styles.pushLabel}>Text Fields</Text>
        </TouchableOpacity>
     </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  list: {
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20, marginBottom: 0,
  },
  pushLabel: {
    padding: 10,
    color: '#2196F3',
  }
});

export default Login;
