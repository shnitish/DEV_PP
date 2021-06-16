import React, { Component } from 'react';

class TodosList extends Component
{
	state = {}

	render() 
	{
		let todos = this.props.todos;
		let deleteTodo = this.props.deleteTodo;

		return (
			<div className="todos container">
				<h1 className="">Todos List</h1>
				{
					todos.map(function (todoObj)
					{
						return (
							<div key={todoObj.id} className="todo input-group mb-4">
								<div className="form-control">{todoObj.todo}</div>
								<button className="btn btn-danger" onClick={()=>{deleteTodo(todoObj.id);}}>Delete</button>
							</div>
						);
					})
				}
			</div>
		);
	}
}

export default TodosList;