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

// import RealmBase from '../storage/realmStorage'
import HomeSiftData from '../data/HomeSiftData.json'
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
  }

  fetchData(value = '') {
    let params = { count: 10, sinceid: value, cate: this.cate, mall: this.mall }
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

        // if (!value) {
        //   console.log('!value')
        //   RealmBase.removeAllData('HomeData')
        //   RealmBase.create('HomeData', responseData.data)
        // }
      })
      .catch(err => {
        // console.log('err', err, value)
        // if (!value) {
        //   let oldData = RealmBase.loadAll('HomeData')
        //   this.setState({
        //     dataSource: oldData,
        //     loaded: true,
        //     refreshing: false
        //   })
        // }
      })
  }

  pushToHalfHourHot() {
    this.props.navigation.navigate('HalfHourHot')
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
          leftItem={() => {
            return this.renderLeftItem()
          }}
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
            data={HomeSiftData}
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
