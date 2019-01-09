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
  TextInput
} from 'react-native'

// import HTTPBase from '../http/HTTPBase'
import CommunalNavBar from '../main/GDCommunalNavBar'
import CommunalHotCell from '../main/GDCommunalCell'
import NoDataView from '../main/GDNoDataView'

const { width, height } = Dimensions.get('window')
const dismissKeyboard = require('dismissKeyboard')

export default class GDSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loaded: false,
      refreshing: false
    }

    this.changeText = ''
  }

  fetchData(value) {
    if (!this.changeText) {
      return
    }
    let params = { q: this.changeText, sinceid: value }
    HTTPBase.get('http://guangdiu.com/api/getresult.php', params)
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

        let searchLastID = responseData.data[responseData.data.length - 1].id
        AsyncStorage.setItem('searchLastID', searchLastID.toString())
      })
      .catch(err => {})
  }

  pop() {
    dismissKeyboard()
    this.props.navigation.pop()
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
    AsyncStorage.getItem('searchLastID').then(value => {
      this.fetchData(value)
    })
  }

  renderLeftItem() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pop()
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: 'back' }} style={styles.navbarLeftItemStyle} />
          <Text>返回</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderTitleItem() {
    return <Text style={styles.navbarTitleItemStyle}>搜索全网折扣</Text>
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
        />

        <View style={styles.toolsViewStyle}>
          <View style={styles.inputViewStyle}>
            <Image
              source={{ uri: 'search_icon_20x20' }}
              style={styles.searchImageStyle}
            />

            <TextInput
              style={styles.textInputStyle}
              keyboardType="default"
              placeholder="请输入搜索商品关键字"
              placeholderTextColor="gray"
              autoFocus={true}
              clearButtonMode="while-editing"
              onChangeText={text => {
                this.changeText = text
              }}
              onEndEditing={() => {
                this.fetchData()
              }}
            />
          </View>

          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.pop()
              }}
            >
              <Text style={{ color: 'green' }}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>

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

  navbarLeftItemStyle: {
    width: 20,
    height: 20,
    marginLeft: 15
  },
  navbarTitleItemStyle: {
    fontSize: 17,
    color: 'black',
    marginRight: 50
  },

  toolsViewStyle: {
    width: width,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  inputViewStyle: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239,239,241,1.0)',
    marginLeft: 10,
    borderRadius: 5
  },
  searchImageStyle: {
    width: 15,
    height: 15,
    marginLeft: 8
  },
  textInputStyle: {
    width: width * 0.75,
    height: 35,
    marginLeft: 8,
    fontSize: 13
  },

  listViewStyle: {
    width: width
  }
})
