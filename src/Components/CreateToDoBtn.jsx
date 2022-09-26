// Boton que crea un nuevo ToDo
import React from 'react';
import './CreateToDoBtn.css';

class CreateToDoBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // Metodo que abre un modal para crear un nuevo ToDo
    createToDo = () => {
        this.props.onCreate();
    }

    render() {
        return (
            <div className="create-todo-btn">
                {/* Tooltip que aparece cuando el boton es hover */}
                {/* <span className="tooltip">Crear ToDo</span> */}
                <button className="btn addTodo-btn" type="button" onClick={this.createToDo}>
                    <span className="material-icons-round">add</span>
                </button>
            </div>
        )
    }
}

export { CreateToDoBtn };