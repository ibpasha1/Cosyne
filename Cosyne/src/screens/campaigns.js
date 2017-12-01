import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Picker,
  StyleSheet,
  View,
  PixelRatio,
  TouchOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage, Slider, Text } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SInfo from 'react-native-sensitive-info'

const appStyles = require('../components/styles');

class Campaign extends Component {
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
  handleSubmit = () =>
  {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then((response) => {
      if (!response.ok){
        console.warn(response.json());
      }
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson['token']){
        SInfo.setItem('token', responseJson['token'], {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain'
          }).then((value) =>
            global.startInnerScope()
        );
      }
      //SInfo.setItem('token', responseJson['token'], {});
    }).catch((err)=> {
      Alert.alert(
            'Alert',
            'ERROR',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
    });
  }
  comparePasswords = (value) => {
    this.setState({password_confirm: value});
    this.setState({
      pass_match: (value && this.state.password === value ? true : false)
    });
  }
  login = () => {

  }
  render(){
    const buttons = ['Hello', 'World', 'Buttons'];
    const { selectedIndex } = this.state;
    return (
      <KeyboardAwareScrollView>
        <Grid>
          <Row>
            <Col>
              <Text style={{height: 10}}>
              </Text>
            </Col>
          </Row>
          <Row>
            <Col size={30} />
            <Col size={40} style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image style={{
                flex: 1,
                aspectRatio: .7,
                resizeMode: 'contain'}}
                source={require('../assets/imgs/COSIGN-LOGO.jpg')} />
            </Col>
            <Col size={30} />
          </Row>
          <Row>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'Business name'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
            <Col size={50}>
              <Hoshi
                isRequired
                label={'Campaign name'}
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
                label={'Location'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
          <Row>
            <Col size={4} />
            <Col size={44}>
              <Text>Min: {this.state.value}</Text>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
            </Col>
            <Col size={4} />
            <Col size={44}>
              <Text>Max: {this.state.value}</Text>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
            </Col>
            <Col size={4} />
          </Row>
          <Row>
            <Col>
              <Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Hoshi
                isRequired
                label={'Reward'}
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
                label={'Product Value'}
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
                label={'Expiration Date'}
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
                label={'Script'}
                autoCapitalize = 'none'
                borderColor={'#008894'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Col>
          </Row>
          <Row>
            <Col size={100}>
            <Button
              raised
              disabled = {false}
              buttonStyle = {{
                backgroundColor: 'white',
                borderColor: '#334433',
              }}
              color = '#334433'
              icon={{name: 'launch', color: '#334433'}}
              title='Launch'
              underlayColor = '#334433'
              onPress = {this.handleSubmit}
            />
            </Col>
          </Row>
        </Grid>
      </KeyboardAwareScrollView>
    );
  }
}

export default Campaign;
