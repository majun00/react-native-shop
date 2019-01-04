import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  AsyncStorage
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
    // console.log(this.props)
    // if (this.props.name == 'home') {
    //   //   if (true) {
    //   console.log('home')
    //   setInterval(() => {
    //     this.setState({
    //       badgeCount: this.state.badgeCount + 1
    //     })
    //     console.log('state', this.state.badgeCount)
    //   }, 3000)
    // }
    
    //   let cnfirstID = 0
    //   let usfirstID = 0
    //   let cnbadgeText = 0
    //   let usbadgeText = 0
    // setInterval(() => {
    //   AsyncStorage.getItem('cnfirstID').then(value => {
    //     cnfirstID = parseInt(value)
    //   })
    //   AsyncStorage.getItem('usfirstID').then(value => {
    //     usfirstID = parseInt(value)
    //   })
    //   if (cnfirstID !== 0 && usfirstID !== 0) {
    //     let params = {
    //       cnmaxid: cnfirstID,
    //       usmaxid: usfirstID
    //     }
    //     HTTPBase.get('http://guangdiu.com/api/getnewitemcount.php', params).then(
    //       responseData => {
    //         cnbadgeText = parseInt(responseData.cn)
    //         usbadgeText = parseInt(responseData.us)
    //         cnbadgeText=2
    //         console.log(responseData, cnbadgeText, usbadgeText)
    //       }
    //     )
    //   }
    // }, 3000)
  }

  getBadge() {
    console.log('getBadge')
    // if (this.props.name == 'home') {
    return this.renderBadge(this.state.badgeCount)
    //   setInterval(() => {
    //     this.setState({
    //       badgeCount: this.state.badgeCount + 1
    //     })
    //     console.log('state', this.state.badgeCount)
    //     this.renderBadge(this.state.badgeCount)
    //   }, 3000)
    // }
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
        {/* {this.renderBadge(this.state.badgeCount)} */}
        {this.getBadge()}
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
