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
import { Kaede, Isao } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SInfo from 'react-native-sensitive-info'
//import { Dropdown } from 'react-native-material-dropdown';

//const appStyles = require('../components/styles');

class Campaign extends Component {
  constructor(props){
    super(props);
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
    this.setState({
      email: '',
      business_name: '',
      campaign_name: '',
      loc: '',
      min_age: 0,
      max_age: 1,
      password: '',
      addressSearch: '',
      addressList: [],
      locationData: [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }]
    });
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
  submitCampaign = () => {
    SInfo.getItem('token', {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'}).then(token => {
      fetch(`http://localhost:3000/api/campaigns`, {
        method: 'GET',
        headers: {
          'X-Access-Token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (!response.ok){
          console.warn(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        let locList = [];
        responseJson.forEach(function(addresses){
          let complete_address = '';
          addresses['address_components'].forEach(function(value){
            complete_address += value['long_name'] + " ";
          });
          //console.warn(complete_address);
          locList.push(complete_address);
        });
        this.setState({addressList: locList});
        //console.warn(responseJson);
        //SInfo.setItem('token', responseJson['token'], {});
      }).catch((err)=> {
        Alert.alert(
              'Campaign Error',
              'Campaign did not submit',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
              ]
            )
      });
    });

  }
  getLocationData = (address) => {
    if (address){
      this.setState({loc: address});
      fetch(`http://localhost:3000/locations/${address}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (!response.ok){
          //console.warn(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        let locList = [];
        responseJson.forEach(function(addresses){
          let complete_address = '';
          addresses['address_components'].forEach(function(value){
            complete_address += value['long_name'] + " ";
          });
          //console.warn(complete_address);
          locList.push(complete_address);
        });
        this.setState({addressList: locList});
        //console.warn(responseJson);
        //SInfo.setItem('token', responseJson['token'], {});
      }).catch((err)=> {
        console.warn('Unable to get location date');
      });
    }
  }

  render(){
    const buttons = ['Hello', 'World', 'Buttons'];
    const { selectedIndex } = this.state;
    let dropdownData = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
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
              <Isao
                isRequired
                style={styles.input}
                label={'Business Name'}
                activeColor={'#008894'}
                passiveColor={'#dadada'}
                autoCapitalize = 'none'
                onChangeText={(business_name) => this.setState({business_name})}
                value={this.state.business_name}
              />
            </Col>
            <Col size={50}>
              <Isao
                isRequired
                style={styles.input}
                label={'Campaign Name'}
                activeColor={'#008894'}
                passiveColor={'#dadada'}
                autoCapitalize = 'none'
                onChangeText={(campaign_name) => this.setState({campaign_name})}
                value={this.state.campaign_name}
              />
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Isao
                isRequired
                style={styles.input}
                label={'Location'}
                activeColor={'#008894'}
                passiveColor={'#dadada'}
                autoCapitalize = 'none'
                onChangeText={(loc) => this.getLocationData(loc)}
                value={this.state.loc}
              />
            </Col>
          </Row>
          <Row>
            <Col size={4} />
            <Col size={44}>
              <Text>Min Age:</Text>
              <Slider
                value={this.state.min_age}
                minimumValue={0}
                maximumValue={this.state.max_age}
                onValueChange={(min_age) => this.setState({min_age})} />
              <Text>Value: {this.state.min_age}</Text>
            </Col>
            <Col size={4} />
            <Col size={44}>
              <Text>Max Age:</Text>
              <Slider
                minimumValue={this.state.min_age}
                maximumValue={100}
                value={this.state.max_age}
                onValueChange={(max_age) => this.setState({max_age})} />
              <Text>Value: {this.state.max_age}</Text>
            </Col>
            <Col size={4} />
          </Row>
          <Row>
            <Col>
              <Picker
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Isao
                isRequired
                style={styles.input}
                label={'Reward'}
                activeColor={'#da7071'}
                passiveColor={'#dadada'}
                autoCapitalize = 'none'
                onChangeText={(reward) => this.setState({reward})}
                value={this.state.reward}
              />
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Isao
                isRequired
                style={styles.input}
                label={'Product value'}
                activeColor={'#008894'}
                passiveColor={'#008894'}
                autoCapitalize = 'none'
                onChangeText={(product_value) => this.setState({product_value})}
                value={this.state.product_value}
              />
            </Col>
          </Row>
          <Row>
            <Col size={100}>
              <Isao
                isRequired
                style={styles.input}
                label={'Expires'}
                activeColor={'#008894'}
                passiveColor={'#008894'}
                autoCapitalize = 'none'
                onChangeText={(expiration) => this.setState({expiration})}
                value={this.state.expiration}
              />
            </Col>
          </Row>
          <Row>

            <Col size={100}>
              <Isao
                isRequired
                style={styles.input}
                label={'Script'}
                activeColor={'#008894'}
                passiveColor={'#008894'}
                autoCapitalize = 'none'
                onChangeText={(script) => this.setState({script})}
                value={this.state.script}
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
              onPress = {this.getLocationData}
            />
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
        </Grid>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

export default Campaign;
