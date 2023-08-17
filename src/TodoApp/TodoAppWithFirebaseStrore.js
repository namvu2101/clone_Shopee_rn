import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
export default function Todos() {
  const todoListCollection = firebase.firestore().collection('todos');

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const unsubscribe = todoListCollection.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((doc) => ({
       ...doc.data(),
       id:doc.id
      }));
      setTasks(newTasks);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = () => {
    todoListCollection.add({
      task: newTask,
      completed: false,
    });
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    todoListCollection.doc(taskId).delete();
  };

  const handleCompleteTask = (task) => {
    todoListCollection.doc(task.id).update({ completed: !task.completed });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      {tasks.map((task) => (
        <View key={task.id} style={styles.task}>
          <Text
            style={[
              styles.taskText,
              task.completed ? styles.completedTaskText : null,
            ]}
          >
            {task.task}
          </Text>
          <View style={styles.taskButtons}>
            <Button
              title={task.completed ? 'Uncomplete' : 'Complete'}
              onPress={() => handleCompleteTask(task)}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteTask(task.id)}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',},
    title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    },
    input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 16,
    },
    task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    },
    taskText: {
    fontSize: 20,
    },
    completedTaskText: {
    textDecorationLine: 'line-through',
    },
    taskButtons: {
    flexDirection: 'row',
    },
    });
    
    