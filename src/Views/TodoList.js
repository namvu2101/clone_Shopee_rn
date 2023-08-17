import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';

function TodoList(){
  return(
    <Todo/>
  )
}

const Example = () => {
  // state để lưu trữ danh sách các task
  const [taskItems, setTaskItems] = useState([]);

  // state để lưu trữ nội dung task mới
  const [newTask, setNewTask] = useState('');

  // hàm xử lý sự kiện khi người dùng thêm task mới
  const addTask = () => {
    if (newTask === '') return;

    const newTaskItems = [...taskItems, { text: newTask, completed: false }];
    setTaskItems(newTaskItems);
    setNewTask('');
  };
  
console.log('item:',newTask,"list: ",ta);
  // hàm xử lý sự kiện khi người dùng click vào một task
  const toggleTaskCompleted = (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems[index].completed = !newTaskItems[index].completed;
    setTaskItems(newTaskItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      {/* form để thêm task mới */}
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add New Task"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => addTask()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* danh sách các task */}
      {taskItems.map((item, index) => (
        <TouchableOpacity style={styles.taskItem} key={index} onPress={() => toggleTaskCompleted(index)}>
          <Text style={[styles.taskText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Todo(){
  const [listItem, setlistItem] = useState([])
  const [item, setitem] = useState('')
  const [Items, setItems] = useState()
  const [completed, setcompleted] = useState(false)

  const HandelAdd =()=>{
  const newItems = {task:item,completed:completed}
    const newItem = [...listItem,newItems]
    item.length == 0 ? alert('Chua nhap') :
    setlistItem(newItem)
    setitem('')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      {/* form để thêm task mới */}
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add New Task"
          value={item}
          onChangeText={text => setitem(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => HandelAdd()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* danh sách các task */}

      {
        listItem.map((item,index) =>(
          <TouchableOpacity style={styles.taskItem} key={index}>
            <Text>{index+1} {item.task}</Text>
          </TouchableOpacity>
        ))
      }
      {/* {taskItems.map((item, index) => (
        <TouchableOpacity style={styles.taskItem} key={index} onPress={() => toggleTaskCompleted(index)}>
          <Text style={[styles.taskText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))} */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addTaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
  },
});

export default TodoList;
