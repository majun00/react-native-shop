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

export default class GDHourList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loaded: false,
      refreshing: false,
      prompt: ''
    }
    this.nexthourhour = ''
    this.nexthourdate = ''
    this.lasthourhour = ''
    this.lasthourdate = ''
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(date, hour) {
    let params = {}
    if (date) {
      params = {
        date: date,
        hour: hour
      }
    }
    HTTPBase.get('http://guangdiu.com/api/getranklist.php', params)
      .then(responseData => {
        console.log(date, hour, responseData)
        this.setState({
          dataSource: responseData.data,
          loaded: true,
          refreshing: false,
          prompt:
            responseData.displaydate +
            responseData.rankhour +
            '点档' +
            '(' +
            responseData.rankduring +
            ')'
        })
        this.nexthourhour = responseData.nexthourhour
        this.nexthourdate = responseData.nexthourdate
        this.lasthourhour = responseData.lasthourhour
        this.lasthourdate = responseData.lasthourdate
      })
      .catch(err => {})
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

  pushToSetting() {
    // this.props.navigation.navigate('Setting')
  }

  lastHour() {
    this.fetchData(this.lasthourdate, this.lasthourhour)
  }
  nextHour() {
    this.fetchData(this.nexthourdate, this.nexthourhour)
  }

  renderTitleItem() {
    return (
      <Image
        source={{ uri: 'navtitle_rank_106x20' }}
        style={styles.navBarTitleItemStyle}
      />
    )
  }

  renderRightItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pushToSetting()
        }}
      >
        <Text style={styles.navBarRightItemStyle}>设置</Text>
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
        />
      )
    }
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
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />

        <View>
          <Text>{this.state.prompt}</Text>
        </View>

        {this.renderView()}

        <View style={styles.operationViewStyle}>
          <TouchableOpacity
            onPress={() => {
              this.lastHour()
            }}
          >
            <Text style={{ marginRight: 10, fontSize: 17, color: 'green' }}>
              {'< ' + '上1小时'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.nextHour()
            }}
          >
            <Text style={{ marginLeft: 10, fontSize: 17, color: 'green' }}>
              {'下1小时' + ' >'}
            </Text>
          </TouchableOpacity>
        </View>
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

  navBarTitleItemStyle: {
    width: 106,
    height: 20,
    marginLeft: 50
  },
  navBarRightItemStyle: {
    fontSize: 17,
    color: 'rgba(123,178,114,1.0)',
    marginRight: 15
  },

  promptViewStyle: {
    width: width,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251,251,251,1.0)'
  },

  operationViewStyle: {
    width: width,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
