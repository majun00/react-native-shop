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

import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window')

export default class GDCommunalSiftMenu extends Component {
  static defaultProps = {
    removeModal: {},
    loadSiftData: {}
  }

  static propTypes = {
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    let data = []
    for (let i = 0; i < this.props.data.length; i++) {
      data.push(this.props.data[i])
    }
    this.setState({
      dataSource: data
    })
  }

  popToHome(data) {
    this.props.removeModal(data)
  }

  siftData(mall, cate) {
    this.props.loadSiftData(mall, cate)
    this.popToHome(false)
  }

  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.siftData(item.mall, item.cate)
          }}
        >
          <View style={styles.itemViewStyle}>
            <Image source={{ uri: item.image }} style={styles.itemImageStyle} />
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.popToHome(false)
        }}
        activeOpacity={1}
      >
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem.bind(this)}
            contentContainerStyle={styles.contentViewStyle}
            initialNumToRender={16}
            horizontal={false}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height
  },

  contentViewStyle: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // width: width,
    top: Platform.OS === 'ios' ? 64 : 44
  },

  itemViewStyle: {
    width: width * 0.25,
    height: 70,
    backgroundColor: 'rgba(249,249,249,1.0)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemImageStyle: {
    width: 40,
    height: 40
  }
})
