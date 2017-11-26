import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, ButtonGroup, Card, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SInfo from 'react-native-sensitive-info'

const appStyles = require('../components/styles');

class SocialMedia extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this._toggleNavBar = 'hidden';
    let to = this._toggleNavBar;
    this.props.navigator.toggleNavBar({
      to,
      animated: false,
    });
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  onNavigatorEvent(event) {
    if (event.id === 'contextualMenuDismissed') {
      this._contextualMenu = false;
    }
  }
  verifyInput = () => {

  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        avatar={<Avatar
                  rounded
                  source={rowData.avatar_url && {uri: rowData.avatar_url}}
                  title={rowData.name[0]}
                />}
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}/>
    );
  }
  render(){
    var styles = StyleSheet.create({
      subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      }
    });
    const list = [
      {
        name: 'Instagram',
        subtitle: 'Social Media Account'
      },
      {
        name: 'Instagram',
        subtitle: 'Social Media Account',
        avatar_url: '../assets/imgs/COSIGN-LOGO.jpg',
        subtitle: 'Vice Chairman'
      }
    ]
    const buttons = ['Hello', 'World', 'Buttons'];
    const { selectedIndex } = this.state;
    return (
      <KeyboardAwareScrollView>
        <List>
          <ListItem
            roundAvatar
            title='Instagram'
            subtitle={
              <View style={styles.subtitleView}>
                <Image source={require('../assets/imgs/icon-example.png')} style={styles.ratingImage}/>
                <Text style={styles.ratingText}>5 months ago</Text>
              </View>
            }
            avatar={require('../assets/imgs/icon-example.png')}
          />
          <ListItem
            roundAvatar
            title='Snapchat'
            subtitle={
              <View style={styles.subtitleView}>
                <Image source={require('../assets/imgs/icon-example.png')} style={styles.ratingImage}/>
                <Text style={styles.ratingText}>5 months ago</Text>
              </View>
            }
            avatar={require('../assets/imgs/icon-example.png')}
          />
        </List>

      </KeyboardAwareScrollView>
    );
  }
}

export default SocialMedia;
