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

import HTTPBase from '../http/HTTPBase'
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

  fetchData(value) {
    let params = { count: 10, sinceid: value, country: 'us' }
    HTTPBase.get('http://guangdiu.com/api/getlist.php', params)
      .then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.concat(responseData.data),
          loaded: true,
          refreshing: false
        })

        let cnlastID = responseData.data[responseData.data.length - 1].id
        AsyncStorage.setItem('cnlastID', cnlastID.toString())
        let cnfirstID = responseData.data[0].id
        AsyncStorage.setItem('cnfirstID', cnfirstID.toString())
      })
      .catch(err => {})
  }

  pushToHalfHourHot() {
    this.props.navigation.navigate('USHalfHourHot')
  }

  pushToDetail(id) {
    this.props.navigation.navigate('CommunalDetail', {
      url: 'https://guangdiu.com/api/showdetail.php?id=' + id
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.fetchData()
  }

  onEndReached = () => {
    AsyncStorage.getItem('cnlastID').then(value => {
      this.fetchData(value)
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

  renderView() {
    if (this.state.loaded === false) {
      return <NoDataView />
    } else {
      return (
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem.bind(this)}
          style={styles.listViewStyle}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          ListFooterComponent={this.renderListFooter}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
        />
      )
    }
  }

  renderListFooter() {
    return (
      <View style={{ height: 50 }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.pushToDetail(item.id)}>
        <CommunalHotCell
          image={item.image}
          title={item.title}
          mall={item.mall}
          pubTime={item.pubtime}
          fromSite={item.fromsite}
        />
      </TouchableOpacity>
    )
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
