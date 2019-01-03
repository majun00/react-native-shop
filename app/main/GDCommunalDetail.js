import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  Dimensions,
  Navigator,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  DeviceEventEmitter,
  InteractionManager,
  Animated,
  Platform,
  WebView
} from 'react-native'

import PropTypes from 'prop-types'
import CommunalNavBar from './GDCommunalNavBar'
const { width, height } = Dimensions.get('window')

export default class GDCommunalDetail extends Component {
  static propTypes = {
    uri: PropTypes.string
  }

  popToHome() {
    this.props.navigation.pop()
  }

  renderRightItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.popToHome()
        }}
      >
        <Text style={styles.navbarRightItemStyle}>关闭</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CommunalNavBar rightItem={() => this.renderRightItem()} />
        <WebView
          style={styles.webViewStyle}
          source={{ uri: this.props.navigation.getParam('url'), method: 'GET' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webViewStyle: {
    flex: 1
  },
  navbarRightItemStyle: {
    fontSize: 17,
    color: 'rgba(123,178,114,1.0)',
    marginRight: 15
  }
})
