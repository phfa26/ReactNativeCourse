import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const GoalItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        listItem: {
            padding: 12,
            backgroundColor: '#ccc',
            borderColor: 'black',
            borderWidth: 1,
            marginVertical: 10
        }
    }
)
export default GoalItem;