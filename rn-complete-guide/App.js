import React, { useState } from 'react';
import { StyleSheet, View, Button, ScrollView, FlatList } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = enteredGoal => {
    if (enteredGoal.length < 1) {
      return;
    }
    setCourseGoals(courseGoals => [...courseGoals, { key: Math.random().toString(), value: enteredGoal }]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.key !== goalId)
    })
  }

  const closeModalHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title='Add new goal' onPress={() => setIsAddMode(true)} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={isAddMode}
        onCancel={closeModalHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            onDelete={removeGoalHandler}
            id={itemData.item.key}
          />
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
})