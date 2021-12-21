import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, SafeAreaView, Platform, StatusBar, ImageBackground } from 'react-native'


export default class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>

                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require("../assets/bg_image.png")} style={styles.backgroundImage}>
                    <View style={styles.titleBar}>
                        <Text> Home Screen </Text>
                    </View>
                    <TouchableOpacity style={styles.routeCard} onPress={() => this.props.navigation.navigate("IssLocation")}>
                        <Text style={styles.routeText}> ISS Location </Text>
                        <Text style={styles.knowMore}> {"Know More ===>"} </Text>
                        <Text style={styles.bgDigit}> 1 </Text>
                        <Image source={require("../assets/iss_icon.png")} style={styles.iconImage} />

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.routeCard} onPress={() => this.props.navigation.navigate("Meteors")}>
                        <Text style={styles.routeText}> Meteors </Text>
                        <Text style={styles.knowMore}> {"Know More ===>"} </Text>
                        <Text style={styles.bgDigit}> 2 </Text>
                        <Image source={require("../assets/meteor_icon.png")} style={styles.iconImage} />

                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    titleBar: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    routeCard: {
        flex: 0.25,
        marginLeft: 50,
        marginTop: 50,
        marginRight: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 2
    },
    routeText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: 'contain',
        right: 20,
        top: -80
    },
    bgDigit: {
        position: 'absolute',
        color: "orange",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    knowMore: {
        paddingLeft: 30,
        color: 'red',

    }
});