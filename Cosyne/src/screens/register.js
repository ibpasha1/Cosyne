import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from '../components/login_style';
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
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const appStyles = require('../components/styles');

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      pass_match: false
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
    fetch('http://localhost:3000/register', {
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
      console.warn(responseJson);
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
  handleEmail = (email) => {
    this.setState({email: email});
    fetch('http://localhost:3000/check_email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email})
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({validationMessage: (responseJson.msg === 'email_taken' ? 'Email taken' : null)});
    }).catch((err)=> {});
  }
  comparePasswords = (value) => {
    this.setState({password_confirm: value});
    this.setState({
      pass_match: (value && this.state.password === value ? true : false)
    });
  }
  render(){
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
            <Col size={15} />
            <Col size={70}>
            <Image style={{
                width: 380,
                height: 200,
                flex: 1,
                aspectRatio: 1.5,
                resizeMode: 'contain'}}
                source={require('../assets/imgs/cosyneCOLOR5.png')} />
            </Col>
            <Col size={15} />
          </Row>
          <Row>
            <Col size={8}></Col>
            <Col size={84}>
              <Hoshi
                autoCapitalize = 'none'
                label={'email'}
                borderColor={'#008894'}
                onChangeText={(email) => this.handleEmail(email)}
                value={this.state.email}
              />
              {
                this.state.validationMessage  ? <FormValidationMessage>{this.state.validationMessage}</FormValidationMessage> : null
              }
              <Hoshi
                autoCapitalize = 'none'
                editable={this.state.validationMessage  ? false : true}
                secureTextEntry
                label={'password'}
                borderColor={'#008894'}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <Hoshi
                autoCapitalize = 'none'
                editable={this.state.validationMessage  ? false : true}
                secureTextEntry
                label={'comfirm-password'}
                borderColor={'#008894'}
                onChangeText={(password_confirm) => this.comparePasswords(password_confirm)}
                value={this.state.password_confirm}
              />
            </Col>
            <Col size={8}></Col>
          </Row>
          <Row>
            <Col size={100}>
              <Row>
                <Text style={{height: 100}}>
                </Text>
              </Row>
              <Button
              buttonStyle = {{
                borderWidth: 1,
                borderRadius: 20,
                height: 40,
                alignItems: 'center',
                backgroundColor: 'white',
              }}
              color='black'
              title='LOGIN' />
              
              <Text style={styles.loginButtonText }>create account</Text>
            </Col>
          </Row>
        </Grid>
      </KeyboardAwareScrollView>
    );
  }
}

export default Register;
 //new button 
 //<View style={styles.login}>
 //<TouchOpacity style={styles.loginButton}>
  // <Text style={styles.loginButtonText}>log in</Text>
  // </TouchOpacity>
//</View>
//new button 