import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors'

const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={{ ...sytles.button, ...props.style }}>
                <Text style={sytles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>

    );
}
const sytles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton;