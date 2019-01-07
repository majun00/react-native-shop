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
  FlatList,
  ScrollView,
  Switch
} from 'react-native'

import PropTypes from 'prop-types'
import CommunalNavBar from '../main/GDCommunalNavBar'

const { width, height } = Dimensions.get('window')

export default class GDSettingCell extends Component {
  static propTypes = {
    leftTitle: PropTypes.string,
    isShowSwitch: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      isOn: false
    }
  }

  renderRightContent() {
    let component
    if (this.props.isShowSwitch) {
      component = (
        <Switch
          value={this.state.isOn}
          onValueChange={() => {
            this.setState({ isOn: !this.state.isOn })
          }}
        />
      )
    } else {
      component = (
        <Image
          sourc={{ uri: 'icon_cell_rightArrow' }}
          style={styles.arrowStyle}
        />
      )
    }
    return component
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.leftTitle}</Text>
        </View>

        <View style={styles.rightViewStyle}>{this.renderRightContent()}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 44 : 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 15
  },

  rightViewStyle: {
    marginRight: 15
  },

  arrowStyle: {
    width: 10,
    height: 10
  }
})
