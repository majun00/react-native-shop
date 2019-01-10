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
  ScrollView
} from 'react-native'

import CommunalNavBar from '../main/GDCommunalNavBar'
import SettingCell from './GDSettingCell'

const { width, height } = Dimensions.get('window')

export default class GDSetting extends Component {
  pop() {
    this.props.navigation.pop()
  }

  renderLeftItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pop()
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: 'back' }} style={styles.navbarLeftItemStyle} />
          <Text>返回</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderTitleItem() {
    return <Text style={styles.navbarTitleItemStyle}>设置</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <CommunalNavBar
          leftItem={() => this.renderLeftItem()}
          titleItem={() => this.renderTitleItem()}
        />

        <ScrollView style={styles.scollViewStyle}>
          <SettingCell leftTitle="淘宝天猫快捷下单" isShowSwitch={true} />

          <SettingCell leftTitle="清理图片缓存" isShowSwitch={false} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  navbarLeftItemStyle: {
    width: 20,
    height: 20,
    marginLeft: 15
  },

  navbarTitleItemStyle: {
    fontSize: 17,
    color: 'black',
    marginRight: 50
  },

  scollViewStyle: {
    backgroundColor: 'white'
  }
})
