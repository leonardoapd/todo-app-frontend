// Componente que renderiza un modal para crear un nuevo ToDo
import React from 'react';
import './CreateToDoModal.css';

class CreateToDoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            description: ''
        }
    }
    // Metodo que se ejecuta cuando el usuario escribe en el input de texto
    onChangeText = (e) => {
        this.setState({
            task: e.target.value
        })
    }
    // Metodo que se ejecuta cuando el usuario escribe en el input de descripcion
    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    // Metodo que se ejecuta cuando el usuario presiona el boton de crear ToDo
    onCreate = () => {
        this.props.onCreate(this.state.task, this.state.description);
        this.setState({
            task: '',
            description: ''
        })
        this.closeModal();
    }
    // Metodo que se ejecuta cuando el usuario presiona el boton de cerrar el modal
    closeModal = () => {
        const modal = document.getElementById('modal');
        modal.close();
    }


    render() {
        return (
            // <React.Fragment>
            //     {this.props.show && (
            <dialog className="modal" id="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Crear ToDo</h2>
                        <i className="material-symbols-outlined modal-close" id="close-modal" onClick={this.closeModal}>
                            cancel
                        </i>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body-input">
                            <label htmlFor="task">ToDo: </label>
                            <input type="text" id="task" onChange={this.onChangeText} value={this.state.task} />
                        </div>
                        <div className="modal-body-input">
                            <label htmlFor="description">Descripcion: </label>
                            <input type="text" id="description" onChange={this.onChangeDescription} value={this.state.description} />
                        </div>
                    </div>
                    <div className="modal-footer d-flex">
                        <button className="btn create-btn" type="button" onClick={this.onCreate}>Crear</button>
                    </div>
                </div>
            </dialog>
            //     )}
            // </React.Fragment>
        )
    }
}

export { CreateToDoModal };