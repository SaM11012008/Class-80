import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'

export default class IssLocationScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> ISS Location Screen </Text>
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