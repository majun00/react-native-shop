// import React, { Component } from 'react'
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ListView,
//   Dimensions,
//   Navigator,
//   ActivityIndicator,
//   Modal,
//   AsyncStorage,
//   DeviceEventEmitter,
//   InteractionManager,
//   Animated,
//   Platform
// } from 'react-native'

// import TabNavigator from 'react-native-tab-navigator'

// import Home from '../home/GDHome'
// import HT from '../ht/GDHt'
// import HourList from '../hourList/GDHourList'

// export default class GD extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedTab: 'home'
//     }
//   }

//   render() {
//     return (
//       <TabNavigator>
//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'home'}
//           title="首页"
//           selectedTitleStyle={{ color: 'black' }}
//           renderIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_home_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           renderSelectedIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_home_selected_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           onPress={() => this.setState({ selectedTab: 'home' })}
//         >
//           <Home />
//         </TabNavigator.Item>
//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'ht'}
//           title="海淘"
//           selectedTitleStyle={{ color: 'black' }}
//           renderIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_abroad_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           renderSelectedIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_abroad_selected_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           onPress={() => this.setState({ selectedTab: 'ht' })}
//         >
//           <HT />
//         </TabNavigator.Item>

//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'hourlist'}
//           title="小时风云榜"
//           selectedTitleStyle={{ color: 'black' }}
//           renderIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_rank_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           renderSelectedIcon={() => (
//             <Image
//               source={{ uri: 'tabbar_rank_selected_30x30' }}
//               style={styles.tabbarIconStyle}
//             />
//           )}
//           onPress={() => this.setState({ selectedTab: 'hourlist' })}
//         >
//           <HourList />
//         </TabNavigator.Item>
//       </TabNavigator>
//     )
//   }

//   // 抽象报错 无法定位到原因 先分离 后期处理
//   //   renderTabBarItem(title, selectedTab, image, selectedImage, component) {
//   //     return (
//   //       <TabNavigator.Item
//   //         selected={this.state.selectedTab === selectedTab}
//   //         title={title}
//   //         selectedTitleStyle={{ color: 'black' }}
//   //         renderIcon={() => (
//   //           <Image source={{ uri: image }} style={styles.tabbarIconStyle} />
//   //         )}
//   //         renderSelectedIcon={() => (
//   //           <Image
//   //             source={{ uri: selectedImage }}
//   //             style={styles.tabbarIconStyle}
//   //           />
//   //         )}
//   //         onPress={() => this.setState({ selectedTab: selectedTab })}
//   //       >
//   //         <Navigator
//   //           // 设置路由
//   //           initialRoute={{
//   //             name: selectedTab,
//   //             component: component
//   //           }}
//   //           renderScene={(route, navigator) => {
//   //             let Component = route.component
//   //             return <Component {...route.params} navigator={navigator} />
//   //           }}
//   //         />
//   //       </TabNavigator.Item>
//   //     )
//   //   }

//   //   render() {
//   //     return (
//   //       <TabNavigator>
//   //         {this.renderTabBarItem(
//   //           '首页',
//   //           'home',
//   //           'tabbar_home_30x30',
//   //           'tabbar_home_selected_30x30',
//   //           Home
//   //         )}
//   //         {this.renderTabBarItem(
//   //           '海淘',
//   //           'ht',
//   //           'tabbar_abroad_30x30',
//   //           'tabbar_abroad_selected_30x30',
//   //           HT
//   //         )}
//   //         {this.renderTabBarItem(
//   //           '小时风云榜',
//   //           'hourlist',
//   //           'tabbar_rank_30x30',
//   //           'tabbar_rank_selected_30x30',
//   //           HourList
//   //         )}
//   //       </TabNavigator>
//   //     )
//   //   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   tabbarIconStyle: {
//     width: Platform.OS === 'ios' ? 30 : 25,
//     height: Platform.OS === 'ios' ? 30 : 25
//   }
// })
