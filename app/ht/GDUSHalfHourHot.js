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

export default class GDHalfHourHot extends Component {
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
    let params = {
      c: 'us'
    }
    HTTPBase.post('http://guangdiu.com/api/gethots.php', params)
      .then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.concat(responseData.data),
          loaded: true,
          refreshing: false
        })
      })
      .catch(err => {})
  }

  popToHome() {
    this.props.navigation.goBack()
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.fetchData()
  }

  pushToDetail(id) {
    this.props.navigation.navigate('CommunalDetail', {
      url: 'https://guangdiu.com/api/showdetail.php?id=' + id
    })
  }

  renderTitleItem() {
    return <Text style={styles.navbarTitleItemStyle}>近半小时海淘热门</Text>
  }

  renderRightItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.popToHome()
        }}
      >
        <Text style={styles.navbarRightItemStyle}>关闭</Text>
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
          ListHeaderComponent={this.renderListHeader}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      )
    }
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.pushToDetail(item.id)}>
        <CommunalHotCell image={item.image} title={item.title} />
      </TouchableOpacity>
    )
  }

  renderListHeader() {
    return (
      <View style={styles.headerPromptStyle}>
        <Text>根据每条折扣的点击进行统计,每5分钟更新一次</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CommunalNavBar
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
    alignItems: 'center'
  },
  navbarTitleItemStyle: {
    fontSize: 17,
    color: 'black',
    marginLeft: 50
  },
  navbarRightItemStyle: {
    fontSize: 17,
    color: 'rgba(123,178,114,1.0)',
    marginRight: 15
  },
  listViewStyle: {
    width: width
  },
  headerPromptStyle: {
    height: 44,
    width: width,
    backgroundColor: 'rgba(239,239,239,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
