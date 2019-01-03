import React, { Component } from 'react'
import { StyleSheet, Image, Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import LaunchPage from './app/main/GDLaunchPage'
import Home from './app/home/GDHome'
import HT from './app/ht/GDHt'
import HourList from './app/hourList/GDHourList'
import HalfHourHot from './app/home/GDHalfHourHot'
import USHalfHourHot from './app/ht/GDUSHalfHourHot'
import CommunalDetail from './app/main/GDCommunalDetail'

// const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: Home
//     },
//     HalfHourHot: {
//       screen: HalfHourHot
//     }
//   }
//   // {
//   //   headerMode: 'none'
//   // }
// )

// const HTStack = createStackNavigator({
//   HT: { screen: HT }
// })
// const HourListStack = createStackNavigator({
//   HourList: { screen: HourList }
// })

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      // screen: HomeStack,
      screen: Home,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                source={{ uri: 'tabbar_home_selected_30x30' }}
                style={styles.tabbarIconStyle}
              />
            )
          }
          return (
            <Image
              source={{ uri: 'tabbar_home_30x30' }}
              style={styles.tabbarIconStyle}
            />
          )
        }
      }
    },
    HT: {
      // screen: HTStack,
      screen: HT,
      navigationOptions: {
        tabBarLabel: '海淘',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                source={{ uri: 'tabbar_abroad_selected_30x30' }}
                style={styles.tabbarIconStyle}
              />
            )
          }
          return (
            <Image
              source={{ uri: 'tabbar_abroad_30x30' }}
              style={styles.tabbarIconStyle}
            />
          )
        }
      }
    },
    HourList: {
      // screen: HourListStack,
      screen: HourList,
      navigationOptions: {
        tabBarLabel: '小时风云榜',
        tabBarVisible: true,
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                source={{ uri: 'tabbar_rank_selected_30x30' }}
                style={styles.tabbarIconStyle}
              />
            )
          }
          return (
            <Image
              source={{ uri: 'tabbar_rank_30x30' }}
              style={styles.tabbarIconStyle}
            />
          )
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000'
    }
  }
)

const ScreenStack = createStackNavigator(
  {
    CommunalDetail: CommunalDetail
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

const HomeStack = createStackNavigator(
  {
    LaunchPage: LaunchPage,
    Tabs: TabNavigator,
    ScreenStack: ScreenStack,
    HalfHourHot: HalfHourHot,
    USHalfHourHot: USHalfHourHot,
  },
  {
    headerMode: 'none'
  }
)

const styles = StyleSheet.create({
  tabbarIconStyle: {
    width: Platform.OS === 'ios' ? 30 : 25,
    height: Platform.OS === 'ios' ? 30 : 25
  }
})

// export default createAppContainer(TabNavigator)
export default createAppContainer(HomeStack)

// ---
// import React, { Component } from 'react'
// import Main from './app/main/GDMain'

// export default class GD extends Component {
//   render() {
//     return <Main />
//   }
// }
