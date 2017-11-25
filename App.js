import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Heading from './app/Heading';
import Input from './app/Input';
import Button from './app/Button';
import TodoList from './app/TodoList';
import TabBar from './app/TabBar';

let todoIndex = 0

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All'
    }
    this.submitTodo = this.submitTodo.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.setType = this.setType.bind(this)
  }

  setType(type) {
    this.setState({ type })
  }

  inputChange(inputValue) {
    console.log(' Input value: ', inputValue)
    this.setState({ inputValue })
  }

  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }

    let todo = {
      title: this.state.inputValue,
      todoIndex: todoIndex,
      complete: false
    }

    todoIndex++
    this.state.todos.push(todo)
    this.setState({ todos: this.state.todos, inputValue: '' }, () => {
      console.log('State: ', this.state)
    })
  }

  deleteTodo(todoIndex) {
    let { todos } = this.state
    todos = this.state.todos.filter((todo) => {
      return todo.todoIndex !== todoIndex
    })
    this.setState({todos})
  }

  toggleComplete(todoIndex) {
    let { todos } = this.state
    todos.forEach((todo) => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete
      }
    })
    this.setState({ todos })
  }

  render() {
    const { inputValue, todos, type } = this.state
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={ styles.content }>
          <Heading />
          <Input inputValue={inputValue}
                 inputChange={(text) => this.inputChange(text)}/>
          <TodoList
            type={type}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo.bind(this)}
            todos={todos} />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});
