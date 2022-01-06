import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, SafeAreaView, Platform, FlatList, ImageBackground, Dimensions } from 'react-native'
import axios from 'axios'

export default class MeteorScreen extends Component {

    constructor() {
        super()

        this.state = {
            meteors: {}
        }

    }

    componentDidMount = () => {
        this.getMeteors()
    }

    getMeteors = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=kWC2OGEEKdGpj6eBKjBCtbpZ32dAMmFLzlHb0OlA")
            .then(response => {
                this.setState({
                    meteors: response.data.near_earth_objects
                })
            })
    }

    keyExtractor = (item, index) => {
        index.toString()
    }

    renderItem = ({ item }) => {
        var meteor = item
        var bgImg, speed, size
        if (meteor.threatScore <= 30) {
            bgImg = require("../assets/meteor_bg1.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 100
        } else if (meteor.threatScore <= 75) {
            bgImg = require("../assets/meteor_bg2.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 150
        } else {
            bgImg = require("../assets/meteor_bg3.png")
            speed = require("../assets/meteor_speed3.gif")
            size = 200
        }

        return (
            <View>
                <ImageBackground source={bgImg} style={styles.backgroundImg}>
                    <View>
                        <Image source={speed} style={{ width: size, height: size, alignSelf: 'center' }}/> 

                        <View>
                            <Text style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}>
                                {item.name}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
                                Closest To Earth :- {item.close_approach_data[0].close_approach_date_full}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Minimum Diameter(km) :- {item.estimated_diameter.kilometers.estimated_diameter_min}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Maximum Diameter(km) :- {item.estimated_diameter.kilometers.estimated_diameter_max}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Velocity(km/hr) :- {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Missing Earth By(km) :- {item.close_approach_data[0].miss_distance.kilometers}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render() {

        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>                        Loading......                    </Text>
                </View>
            )

        } else {
            var meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            var meteors = [].concat.apply([], meteor_arr)
            meteors.forEach(function (element) {
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                var threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threatScore = threatScore
            })
            meteors.sort(function (a, b) {
                return b.threatScore - a.threatScore
            })
            meteors = meteors.slice(0, 5)


            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <FlatList keyExtractor={this.keyExtractor}
                        data={meteors}
                        renderItem={this.renderItem}
                        horizontal={true} />
                </View>
            )
        }
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
    backgroundImg: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }, 
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
})
