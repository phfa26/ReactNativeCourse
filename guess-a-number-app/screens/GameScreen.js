import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

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
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", 'You know that it is wrong!', [{ text: 'oops, sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1)

    }

    return (
        <View style={styles.screen}>
            <TitleText>
                Opponent's guess
            </TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonsGroup}>
                <View style={styles.buttonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </View>
                <MainButton onPress={props.onCancel} style={styles.restartButton} >
                    <Ionicons name='md-refresh' size={24} color='white' />
                </MainButton>
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
        marginBottom: 30,
        width: 400,
        maxWidth: '80%'
    },
    buttonsGroup: {
        alignItems: 'center'
    },
    restartButton: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default GameScreen;