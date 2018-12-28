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
  FlatList
} from 'react-native'

import CommunalNavBar from '../main/GDCommunalNavBar'
import CommunalHotCell from '../main/GDCommunalCell'
import NoDataView from '../main/GDNoDataView'

const { width, height } = Dimensions.get('window')

export default class GDHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loaded: false,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    let formData = new FormData()
    formData.append('count', 30)
    fetch('http://guangdiu.com/api/getlist.php',{
      method:'POST',
      headers:{},
      body:formData
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.concat(responseData.data),
          loaded: true,
          refreshing: false
        })
      })
  }

  renderLeftItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pushToHalfHourHot()
        }}
      >
        <Image
          source={{ uri: 'hot_icon_20x20' }}
          style={styles.navBarLeftItemStyle}
        />
      </TouchableOpacity>
    )
  }

  renderTitleItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('title')
        }}
      >
        <Image
          source={{ uri: 'navtitle_home_down_66x20' }}
          style={styles.navBarTitleItemStyle}
        />
      </TouchableOpacity>
    )
  }

  renderRightItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('to search')
        }}
      >
        <Image
          source={{ uri: 'search_icon_20x20' }}
          style={styles.navBarRightItemStyle}
        />
      </TouchableOpacity>
    )
  }

  pushToHalfHourHot() {
    this.props.navigation.navigate('HalfHourHot')
  }

  renderView() {
    if (this.state.loaded === false) {
      return <NoDataView />
    } else {
      return (
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          style={styles.listViewStyle}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      )
    }
  }

  renderItem({ item }) {
    return <CommunalHotCell image={item.image} title={item.title} />
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.fetchData()
  }

  render() {
    return (
      <View style={styles.container}>
        <CommunalNavBar
          leftItem={() => this.renderLeftItem()}
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />

        {this.renderView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  navBarLeftItemStyle: {
    width: 20,
    height: 20,
    marginLeft: 15
  },
  navBarTitleItemStyle: {
    width: 66,
    height: 20
  },
  navBarRightItemStyle: {
    width: 20,
    height: 20,
    marginRight: 15
  },

  listViewStyle: {
    width: width
  }
})
