// Componente que renderiza un campo de buscqueda de ToDo
import React from 'react';
import './ToDoSearch.css';

class ToDoSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        } 
        return (
            <section className="todo-search">
                <input type="text" placeholder="Search for To Do" onChange={this.handleChange} />
            </section>
        )
    }
    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })

        this.props.onSearch(e.target.value);
    }

    componentDidMount() {
        this.props.onSearch(this.state.search);
    }

}

export { ToDoSearch };