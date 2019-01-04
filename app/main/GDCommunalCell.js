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

import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window')

export default class GDCommunalCell extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    mall: PropTypes.string,
    pubTime: PropTypes.string,
    fromSite: PropTypes.string
  }

  renderDate(pubTime, fromSite) {
    console.log(pubTime)
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let week = day * 7
    let month = day * 30

    // 计算时间差
    let now = new Date().getTime()
    let diffValue = now - Date.parse(pubTime.replace(/-/gi, '/'))

    if (diffValue < 0) return

    let monthC = diffValue / month
    let weekC = diffValue / week
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minuteC = diffValue / minute

    let result

    if (monthC >= 1) {
      result = parseInt(monthC) + '月前'
    } else if (weekC >= 1) {
      result = parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前'
    } else if (minuteC >= 1) {
      result = parseInt(minuteC) + '分钟前'
    } else {
      result = '刚刚'
    }

    return result + ' · ' + fromSite
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              this.props.image === ''
                ? 'defaullt_thumb_83x83'
                : this.props.image
          }}
          style={styles.imageStyle}
        />

        <View style={styles.centerViewStyle}>
          <View>
            <Text numberOfLines={3} style={styles.titleStyle}>
              {this.props.title}
            </Text>
          </View>

          <View style={styles.detailViewStyle}>
            <Text style={styles.detailMallStyle}>{this.props.mall}</Text>
            <Text style={styles.timeStyle}>
              {this.renderDate(this.props.pubTime, this.props.fromSite)}
            </Text>
          </View>
        </View>

        <Image
          source={{ uri: 'icon_cell_rightArrow' }}
          style={styles.arrowStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 100,
    width: width,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginLeft: 15
  },

  imageStyle: {
    width: 70,
    height: 70
  },

  centerViewStyle: {
    height: 70,
    justifyContent: 'space-around'
  },

  titleStyle: {
    width: width * 0.65
  },

  detailViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailMallStyle: {
    fontSize: 12,
    color: 'green'
  },
  timeStyle: {
    fontSize: 12,
    color: 'gray'
  },

  arrowStyle: {
    width: 10,
    height: 10,
    marginRight: 30
  }
})
