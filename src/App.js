import React from 'react';
import './App.css';
import { ToDoCounter } from './Components/ToDoCounter';
import { ToDoSearch } from './Components/ToDoSearch';
import { ToDoList } from './Components/ToDoList';
import { CreateToDoBtn } from './Components/CreateToDoBtn';
import { CreateToDoModal } from './Components/CreateToDoModal';
// Importar axios
import axios from 'axios';

// Array of ToDo items to be displayed in the ToDoList component
// const todos = [
//   {
//     id: 1,
//     text: 'Learn React',
//     description: 'This is a description',
//     completed: false
//   },
//   {
//     id: 2,
//     text: 'Learn Redux',
//     description: 'This is a description',
//     completed: false
//   },
//   {
//     id: 3,
//     text: 'Learn React Router',
//     description: 'This is a description',
//     completed: false
//   }
// ];

// url de la API
const API_URL = 'http://localhost:8080/api/todos';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      showModal: false,
      remainingTodos: 0
    };
  }

  todosNoCompleted = async () => {
    // Actualizar el estado de los remaining todos
    console.log(this.state.remainingTodos);
    console.log(this.state.todos.filter(todo => !todo.completed).length)
    await this.setState(prevState => ({
      remainingTodos: prevState.todos.filter(todo => !todo.completed).length
    }));
    console.log(this.state.remainingTodos);
  }

  onSearch = (term) => {
    // Filter the todos array based on the search term
    if (term) {
      const filteredTodos = this.state.todos.filter(todo => todo.task.toLowerCase().includes(term.toLowerCase()));
      this.setState({
        todos: filteredTodos
      });
    } else {
      this.getTodos();
    }
  }

  // Verificar si el todo ha sido completado o no
  // onDelete = (id, completed) => {
  //   console.log(id, completed);
  //   // Cambiar el estado del ToDo a completado en la base de datos
  //   axios.put(API_URL + '/' + id, {
  //     completed: completed
  //   })
  //     .then((response) => {
  //       // Cambiar el estado del ToDo a completado en el componente padre
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // Actualizar el estado a completado a partir del id del todo
  //   // const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
  //   // this.setState({
  //   //   todos: updatedTodos
  //   // });

  //   // this.todosNoCompleted();
  // }

  // Abrir el modal para crear un nuevo todo
  onCreate = async (task, description) => {
    const newTodo = {
      task: task,
      description: description,
      completed: false
    };
    // Enviar el nuevo todo a la API
    await axios.post(API_URL, newTodo)
      .then(response => {
        // Actualizar el estado
        this.setState({
          todos: [...this.state.todos, response.data]
        });
      });
    this.todosNoCompleted();
  }

  // Actualizar el estado de un todo a completado
  updateCompleted = async (id, completed) => {
    console.log('updateCompleted');

    // Cambiar el estado del ToDo a completado en la base de datos
    await axios.put(API_URL + '/' + id, {
      completed: completed
    })
      .then((response) => {
        // Cambiar el estado del ToDo a completado en el componente padre
        this.setState({ todos: this.state.todos.map(todo => todo.id === id ? { ...todo, completed: completed } : todo) });
      })
      .catch((error) => {
        console.log(error);
      });

    this.todosNoCompleted();
  }

  // Abrir el modal para crear un nuevo todo
  showModal = () => {
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal
    // }));
    const modal = document.getElementById('modal');
    modal.showModal();
  }


  getTodos = async () => {
    // Obtener los todos de la API
    await axios.get(API_URL)
      .then(response => {
        // Actualizar el estado
        this.setState({
          todos: response.data
        });
      });
    this.todosNoCompleted();
  }

  // Llamada a la API para obtener los todos
  async componentDidMount() {
    this.getTodos();
  }


  render() {
    return (
      <React.Fragment>
        <ToDoCounter completed={this.state.remainingTodos} />
        <ToDoSearch onSearch={this.onSearch} />
        {/* Reenderizado condicional, cuando hay un fallo en la conexion a la api o no hay tareas en la bd, se renderiza que no hay tareas. */}
        {this.state.todos.length > 0 ?
          <ToDoList todos={this.state.todos} onComplete={this.updateCompleted} key={this.state.todos.id} />
          : <p>No hay tareas</p>}
        <CreateToDoModal id="modal" onCreate={this.onCreate} />
        <CreateToDoBtn onCreate={this.showModal} />
      </React.Fragment>
    );
  }
}


export { App };
