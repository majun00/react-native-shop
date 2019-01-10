import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native'

// import HTTPBase from '../http/HTTPBase'

export default class GDNoDataView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      badgeCount: 0
    }
  }

  componentDidMount() {
    this.name = this.props.name
    this.startBadgeTimer()

    this.subscription = DeviceEventEmitter.addListener('getBadge', () => {
      this.getBadge()
    })
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)

    this.subscription.remove()
  }

  async getBadge() {
    const res = await AsyncStorage.multiGet(['cnfirstID', 'usfirstID'])
    const cnfirstID = res[0][1]
    const usfirstID = res[1][1]

    let params = {
      cnmaxid: cnfirstID,
      usmaxid: usfirstID
    }

    HTTPBase.get('http://guangdiu.com/api/getnewitemcount.php', params)
      .then(responseData => {
        // console.log('timer', params, responseData)
        if (this.name == 'home') {
          this.setState({
            badgeCount: parseInt(responseData.cn)
          })
        } else if (this.name == 'ht') {
          this.setState({
            badgeCount: parseInt(responseData.us)
          })
        }
      })
      .catch(err => {})
  }

  startBadgeTimer() {
    if (!this.name) {
      return
    }
    this.timer = setInterval(() => {
      this.getBadge()
    }, 15000)
  }

  renderBadge(badgeCount) {
    if (badgeCount == 0) {
      return
    }
    return (
      <View
        style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 6,
          width: 12,
          height: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
          {badgeCount}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Image
          source={{ uri: this.props.uri }}
          style={styles.tabbarIconStyle}
        />

        {this.renderBadge(this.state.badgeCount)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabbarIconStyle: {
    width: Platform.OS === 'ios' ? 30 : 25,
    height: Platform.OS === 'ios' ? 30 : 25
  }
})
