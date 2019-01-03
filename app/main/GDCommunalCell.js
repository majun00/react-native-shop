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
    title: PropTypes.string
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.image === '' ? 'defaullt_thumb_83x83' : this.props.image }} style={styles.imageStyle} />
        
        <View>
          <Text numberOfLines={3} style={styles.titleStyle}>
            {this.props.title}
          </Text>
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
  titleStyle: {
    width: width * 0.65
  },
  arrowStyle: {
    width: 10,
    height: 10,
    marginRight: 30
  }
})
