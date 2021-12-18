import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import HomeScreen from './screens/Home'
import MeteorScreen from './screens/Meteors'
import IssLocationScreen from './screens/IssLocation'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default class App extends Component {
  render() {
    return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="IssLocation" component={IssLocationScreen} />
          <Stack.Screen name="Meteors" component={MeteorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});