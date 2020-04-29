import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = (props) => {
    return (
        <Text style={{ ...sytles.title, ...props.style }}>{props.children}</Text>
    );
}
const sytles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
})

export default TitleText;