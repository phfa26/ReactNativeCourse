import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import MainButton from '../components/MainButton'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'

const GameOverScreen = (props) => {

    return (
        <View style={styles.screen}>
            <TitleText>
                Game over
            </TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={500}
                    source={require('../assets/success.png')}
                    // source={{ uri: 'http://google.com' }} ****THIS IS HOW TO IMPORT IMAGES FROM WEB INTO REACT NATIVE
                    style={styles.image}
                    resizeMode='cover' />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <View style={styles.buttonContainer}>
                <MainButton onPress={props.onRestart} >New Game</MainButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        maxWidth: '70%',
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
})

export default GameOverScreen;