import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => {
    return (
        <Text style={{ ...sytles.body, ...props.style }}>{props.children}</Text>
    );
}
const sytles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default BodyText;