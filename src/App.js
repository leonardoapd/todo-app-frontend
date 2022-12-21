import React from 'react';
import './App.css';
import { ToDoCounter } from './components/ToDoCounter';
import { ToDoSearch } from './components/ToDoSearch';
import { ToDoList } from './components/ToDoList';
import { CreateToDoBtn } from './components/CreateToDoBtn';
import { Modal } from './components/Modal';
import { Tooltip } from './components/Tooltip';
import { Navbar } from './components/Navbar/Navbar';

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

// Usar variable de entorno para la URL de la API
const API_URL = process.env.REACT_APP_API_URL;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      showModal: false,
      remainingTodos: 0,
      showTooltip: false,
      modalTitle: '',
      modalSubmitText: '',
      taskId: 0
    };
  }

  todosNoCompleted = async () => {
    // Actualizar el estado de los remaining todos
    // console.log(this.state.remainingTodos);
    // console.log(this.state.todos.filter(todo => !todo.completed).length)
    if (this.state.todos.length > 0) {
      await this.setState(prevState => ({
        remainingTodos: prevState.todos.filter(todo => !todo.completed).length
      }));
    }
    // console.log(this.state.remainingTodos);
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

  onSubmitPressed = (task, description, id) => {

    // Si el id es 0, se crea una nueva tarea
    if (id === 0) {
      // Crear una nueva tarea
      this.createTODO(task, description);
    } else {
      // Actualizar una tarea existente
      console.log('Actualizando tarea existente...');
      this.updateTODO(task, description, id);
    }

  }



  // Abrir el modal para crear un nuevo todo
  createTODO = async (task, description) => {
    const newTodo = {
      task: task,
      description: description,
      completed: false,
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

  // Actualizar un todo existente
  updateTODO = async (task, description, id) => {
    const updatedTodo = {
      task: task,
      description: description,
      completed: true,
    };

    // Enviar el nuevo todo a la API
    await axios.put(API_URL + '/' + id, updatedTodo)
      .then(response => {
        // Actualizar el estado
        this.setState({ todos: this.state.todos.map(todo => todo.id === id ? response.data : todo) });
      });
    this.todosNoCompleted();
  }


  // Actualizar el estado de un todo a completado
  updateCompleted = async (id, completed) => {
    // console.log('updateCompleted');

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

  showTooltip = () => {
    this.setState({ showTooltip: true });
    // console.log("Hola");
  }

  hideTooltip = () => {
    this.setState({ showTooltip: false });
  }

  deleteTodo = async (id) => {
    // Eliminar el todo de la base de datos
    await axios.delete(API_URL + '/' + id)
      .then(response => {
        // Actualizar el estado
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
      });
    this.todosNoCompleted();
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

  showCreateModal = () => {
    // Abrir el modal para crear un nuevo todo
    const modal = document.getElementById('modal');
    this.setState({ modalTitle: 'Create Todo', modalSubmitText: 'Create' });

    console.log(this.state.modalTitle);
    modal.showModal();
  }

  showEditModal = (id) => {
    // Abrir el modal para editar un todo
    const modal = document.getElementById('modal');
    this.setState({ modalTitle: 'Edit Todo', modalSubmitText: 'Update', taskId: id });
    modal.showModal();
  }


  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ToDoCounter
          completed={this.state.remainingTodos} />
        <ToDoSearch
          onSearch={this.onSearch} />
        {/* Reenderizado condicional, cuando hay un fallo en la conexion a la api o no hay tareas en la bd, se renderiza que no hay tareas. */}
        {this.state.todos.length > 0 ?
          <ToDoList
            todos={this.state.todos}
            onComplete={this.updateCompleted}
            onDelete={this.deleteTodo}
            onEdit={this.showEditModal}
            key={this.state.todos.id} />
          : <p className='no-todos'>No todo's to complete</p>}
        <Modal
          id="modal"
          title={this.state.modalTitle}
          submitText={this.state.modalSubmitText}
          onCreate={this.onSubmitPressed}
          taskId={this.state.taskId} />
        {this.state.showTooltip && <Tooltip text="Click to create a new todo" />}
        <CreateToDoBtn
          onCreate={this.showCreateModal}
          onShowTooltip={this.showTooltip}
          onHideTooltip={this.hideTooltip} />
      </React.Fragment>
    );
  }
}


export { App };
