import React, { Component } from 'react';
const appStyles = require('../components/styles');

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
} from 'react-native';

import {
  MKTextField,
  MKColor,
  mdl,
} from 'react-native-material-kit';

const styles = Object.assign({}, appStyles, StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center', // this will prevent TFs from stretching horizontal
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
}));

class Welcome extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render(){
    return (
      <ScrollView style={styles.scrollView}
                  contentContainerStyle={styles.container}>
        <View>
          
        </View>
      </ScrollView>
    );
  }
}

export default Welcome;
