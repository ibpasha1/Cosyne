import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, ButtonGroup } from 'react-native-elements';
/*
import {
  MKTextField,
  MKColor,
  mdl,
} from 'react-native-material-kit';
 */

const appStyles = require('../components/styles');

const styles = StyleSheet.create({
  container: {

  },
  scrollView: {

  }
});

class Welcome extends Component {
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
  componentDidMount(){

  }
  onNavigatorEvent(event) {
    if (event.id === 'contextualMenuDismissed') {
      this._contextualMenu = false;
    }
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  login = () => {

  }
  render(){
    const buttons = ['Hello', 'World', 'Buttons']
    const { selectedIndex } = this.state;
    return (
      <Grid>
        <Row size={50}></Row>
        <Row size={25}>
          <Col>
            <Button
              raised
              icon={{name: 'launch'}}
              backgroundColor={'#397af8'}
              borderRadius ={12}
              title='Login'
            />
            <Button
              raised
              backgroundColor={'#397af8'}
              borderRadius ={12}
              icon={{name: 'flight'}}
              title='Register'
            />
          </Col>
        </Row>
        <Row size={25}></Row>
      </Grid>
    );
  }
}

export default Welcome;
