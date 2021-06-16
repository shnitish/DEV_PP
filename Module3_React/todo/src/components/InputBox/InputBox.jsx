import React, { Component } from 'react';

class  InputBox extends Component
{
    state = 
    {
        todoValue: ""
    }

    handleOnChange =(e)=>
    {
        let value = e.target.value;
        this.setState(
        {
            todoValue: value
        })
    }

    handleAddTodo =()=>
    {
        let todo = this.state.todoValue;
        this.props.addTodo(todo);
        this.setState({todoValue: ""});
    }

    handleKeyPress =(e)=>
    {
        let handleAddTodo = this.handleAddTodo;
        if(e.key == "Enter")
        {
            handleAddTodo();
        }
    }
    
    render() 
    { 
        let todoValue = this.state.todoValue;
        let handleAddTodo = this.handleAddTodo;
        let handleOnChange = this.handleOnChange;
        let handleKeyPress = this.handleKeyPress;

        return (
            <div className="input-box container input-group mt-4">
                <input 
                type="text" 
                className="form-control" 
                value={todoValue}
                onChange={handleOnChange}
                onKeyPress={handleKeyPress}>
                </input>
                <button className="btn-primary" onClick={handleAddTodo}>Add Todo</button>
            </div>
        );
    }
}
 
export default InputBox ;