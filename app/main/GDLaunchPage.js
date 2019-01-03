import React, { Component } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default class GDLaunchPage extends Component {
  componentDidMount() {
    setTimeout(() => {
    //   this.props.navigation.navigate('HT')
      this.props.navigation.replace('Tabs')
    }, 2000)
  }
  
  render() {
    return <Image source={{ uri: 'launchimage' }} style={styles.imageStyle} />
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: height
  }
})
