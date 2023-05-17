import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    } else {

      const newTask = [...tasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }]
      setTasks(newTask)
    }

  }


  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id)

    if (!foundItem) {
      return
    }
    foundItem.done = !foundItem.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: 'Sim',
        onPress: () => {
          const removeTask = tasks.filter((task) => task.id !== id)
          setTasks(removeTask)
        },
        style: 'default',
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle : string){

    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === taskId)
    
    if (!foundItem) {
      return
    }
    foundItem.title = taskNewTitle
    setTasks(updatedTasks)
    console.log(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})