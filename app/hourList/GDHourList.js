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
  Platform
} from 'react-native'

export default class GDHourList extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
  });
  render() {
    return (
      <View>
        <Text>hourList</Text>
      </View>
    )
  }
}
