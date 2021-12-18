import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'

export default class MeteorScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Meteor Screen </Text>
            </View>
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