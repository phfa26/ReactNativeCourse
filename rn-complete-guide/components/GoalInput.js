import React, { useState } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';


const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('')

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='This is an input field'
                style={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoal}
            />
            <Button title='ADDed' onPress={props.onAddGoal.bind(this, enteredGoal)} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '80%'
    }
})
export default GoalInput;