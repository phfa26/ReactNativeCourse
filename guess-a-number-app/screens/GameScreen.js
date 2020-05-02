import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
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

const renderListItem = (listLength, itemData) => {
    let numOfRound = listLength - itemData.index
    return (
        <View style={styles.listItem}>
            <BodyText> #{numOfRound} </BodyText>
            <BodyText> {itemData.item} </BodyText>
        </View>
    )
}

//* USE THIS FOR SCROLLVIEW INSTEAD OF FLAT LIST */
// const renderListItem = (value, numOfRound) => {
//     return (
//         <View style={styles.listItem} key={value}>
//             <BodyText> #{numOfRound} </BodyText>
//             <BodyText> {value} </BodyText>
//         </View>
//     )
// }

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", 'You know that it is wrong!', [{ text: 'oops, sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])

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
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
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
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        width: 300,
        flexGrow: 0.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%'
    }

})

export default GameScreen;