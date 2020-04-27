import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", 'You know that it is wrong!', [{ text: 'oops, sorry!', style: 'cancel' }]);
            return;
        }
    }

    return (
        <View style={styles.screen}>
            <Text>
                Opponent's guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
            <Card style={styles.buttonContainer}>
                <Button title='CANCEL' onPress={props.onCancel} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen;