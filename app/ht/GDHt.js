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

import HTSiftData from '../data/HTSiftData.json'
// import HTTPBase from '../http/HTTPBase'
import CommunalNavBar from '../main/GDCommunalNavBar'
import CommunalHotCell from '../main/GDCommunalCell'
import CommunalSiftMenu from '../main/GDCommunalSiftMenu'
import NoDataView from '../main/GDNoDataView'

const { width, height } = Dimensions.get('window')

export default class GDHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loaded: false,
      refreshing: false,
      isSiftModal: false
    }
    this.mall = ''
    this.cate = ''
  }

  componentDidMount() {
    this.fetchData()

    this.subscription = DeviceEventEmitter.addListener('clickHTItem', () => {
      this.clickTarBarItem()
    })
  }

  componentWillUmmount() {
    this.subscription.remove()
  }

  clickTarBarItem() {
    let list = this.refs.list
    if (list._listRef._scrollMetrics.offset == 0) {
      this.setState({
        refreshing: true
      })
      setTimeout(() => {
        this.fetchData()
      }, 1000)
    } else {
      list.scrollToOffset({ offset: 0 })
    }
  }

  fetchData(value) {
    let params = {
      count: 10,
      cate: this.cate,
      mall: this.mall,
      country: 'us'
    }

    if (value) {
      Object.assign(params, {
        sinceid: value
      })
    }

    HTTPBase.get('http://guangdiu.com/api/getlist.php', params)
      .then(responseData => {
        let oldData = this.state.dataSource
        if (!value) {
          oldData = []
        }
        this.setState({
          dataSource: oldData.concat(responseData.data),
          loaded: true,
          refreshing: false
        })

        let cnlastID = responseData.data[responseData.data.length - 1].id
        AsyncStorage.setItem('cnlastID', cnlastID.toString())

        let cnfirstID = responseData.data[0].id
        AsyncStorage.setItem('cnfirstID', cnfirstID.toString())

        DeviceEventEmitter.emit('getBadge')
      })
      .catch(err => {})
  }

  pushToHalfHourHot() {
    this.props.navigation.navigate('USHalfHourHot')
  }

  pushToSearch() {
    this.props.navigation.navigate('Search')
  }

  pushToDetail(id) {
    this.props.navigation.navigate('CommunalDetail', {
      url: 'https://guangdiu.com/api/showdetail.php?id=' + id
    })
  }

  showSiftMenu() {
    this.setState({
      isSiftModal: true
    })
  }

  closeModal(data) {
    this.setState({
      isSiftModal: data
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.fetchData()
  }

  onEndReached = async () => {
    const value = await AsyncStorage.getItem('cnlastID')
    this.fetchData(value)
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
          this.showSiftMenu()
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
          this.pushToSearch()
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
          ref="list"
          data={this.state.dataSource}
          renderItem={this.renderItem.bind(this)}
          style={styles.listViewStyle}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          ListFooterComponent={this.renderListFooter}
          onEndReachedThreshold={0.1}
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
      <TouchableOpacity
        onPress={() => {
          this.pushToDetail(item.id)
        }}
      >
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

        <Modal
          visible={this.state.isSiftModal}
          onRequestClose={() => {
            this.closeModal(false)
          }}
          transparent={true}
          animationType="none"
          pointerEvents={'box-none'}
        >
          <CommunalSiftMenu
            data={HTSiftData}
            removeModal={data => {
              this.closeModal(data)
            }}
            loadSiftData={(mall, cate) => {
              this.mall = mall
              this.cate = cate
              this.fetchData()
            }}
          />
        </Modal>
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
