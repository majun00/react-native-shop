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
    this.cnfirstID = 0
    this.usfirstID = 0
    this.cnbadgeText = 0
    this.usbadgeText = 0
    this.name=''
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

  getBadge() {
    // AsyncStorage.multiGet(['cnfirstID', 'usfirstID'], (err, stores) => {
    //   this.cnfirstID = parseInt(stores[0][1])
    //   this.usfirstID = parseInt(stores[1][1])
    // })
    // if (this.cnfirstID !== 0 && this.usfirstID !== 0) {
    //   let params = {
    //     cnmaxid: this.cnfirstID,
    //     usmaxid: this.usfirstID
    //   }
    //   HTTPBase.get('http://guangdiu.com/api/getnewitemcount.php', params)
    //     .then(responseData => {
    //       console.log('timer', responseData)
    //       this.cnbadgeText = parseInt(responseData.cn)
    //       this.usbadgeText = parseInt(responseData.us)
    //     })
    //     .catch(err => {})
    // }

    // mock
    this.cnbadgeText = this.cnbadgeText + 1
    this.usbadgeText = this.usbadgeText + 2

    if (this.name == 'home') {
      this.setState({
        badgeCount: this.cnbadgeText
      })
    } else if (this.name == 'ht') {
      this.setState({
        badgeCount: this.usbadgeText
      })
    }

    console.log('getBadge', this.state.badgeCount)
  }

  startBadgeTimer() {
    if (!this.name) {
      return
    }
    this.timer = setInterval(() => {
      this.getBadge()
    }, 10000)
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
