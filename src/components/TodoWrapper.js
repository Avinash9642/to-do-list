import React ,{useState} from 'react'  
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
//The v4 function from the 'uuid' package is imported as  uuidv4. This function is used to generate unique IDs for todos.
uuidv4();



export const TodoWrapper = () => 
{
    const [todos,setTodos]=useState([ ])    //The state todos stores an array of todo objects.
    //The React useState Hook allows us to track state in a function component

    const addTodo= todo =>
    {
        setTodos([...todos, {id:uuidv4(),task: todo , completed: false,isEditing:false}])
        console.log(todos)
    }
    //Inside the function, a new todo object is created with properties: id (generated using uuidv4()),
    // task (the provided todo text), completed (initially set to false), and isEditing (initially set to false).

    const toggleComplete=id=>
    {
        setTodos(todos.map(todo=>todo.id===id?{...todo,completed : !todo.completed} :todo ))
    }


    const deleteTodo =id =>
    {
        setTodos(todos.filter(todo=>todo.id!==id))
        // .filter() method to create a new array  includes all todos except the one with the specified 'id'.
    }

    const editTodo=id=>
    {
        setTodos(todos.map(todo=>todo.id===id ? {...todo,isEditing: !todo.isEditing} :todo ))
    }

    const editTask=(task,id)=>
    {
        setTodos(todos.map(todo=>todo.id===id?{
        ...todo,task,isEditing: !todo.isEditing}:todo))
    }

  return (
        <div  className='TodoWrapper' >

            <h1>Get things done!</h1>
            <TodoForm  addTodo={addTodo}/>

            {todos.map((todo,index)=>(
                todo.isEditing ? ( <EditTodoForm editTodo={editTask} task={todo} /> ) : 
                (
                    <Todo task={todo} key={index}
                    toggleComplete={toggleComplete} 
                    deleteTodo={deleteTodo} editTodo={editTodo}  />
                )
            
                ))}
        </div>
        )
}


