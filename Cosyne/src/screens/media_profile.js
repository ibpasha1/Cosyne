import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  PixelRatio,
  TouchOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, ButtonGroup, Card, FormLabel, FormInput, FormValidationMessage, List, ListItem, Text } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SInfo from 'react-native-sensitive-info'

const appStyles = require('../components/styles');

class MediaProfile extends Component {
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
        <Grid>
          <Row>
            <Text style={{height: 100}}>
            </Text>
          </Row>
          <Row>
            <Col size={10} />
            <Col size={40}>
              <Image style={{
                flex: 1,
                aspectRatio: .7,
                resizeMode: 'contain'}}
                source={require('../assets/imgs/COSIGN-LOGO.jpg')} />
            </Col>
            <Col size={50}>
              <Text h4>Instagram</Text>
              <Hoshi
                isRequired
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
          <Row>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'First name'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'Last name'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Hoshi
                isRequired
                label={'Street Address'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
          <Row>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'City'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'State'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
        </Grid>
      </KeyboardAwareScrollView>
    );
  }
}

export default MediaProfile;
