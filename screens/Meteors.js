import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
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
                meteors: response.data.near_earth_objects
                this.setState({
                })
                    .catch(error => {
                        alert(error.message)
                    })
            })
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

            return (
                <Text style={this.styles.container}> Meteor Screen </Text>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
