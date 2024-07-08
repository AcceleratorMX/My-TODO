import React from 'react';
import useTodos from './useTodos';
import useCategories from '../Categories/useCategories';
import {Trash} from "react-bootstrap-icons";

const TodoList = () => {
    const {
        todos,
        handleDeleteTodo,
        handleIsDone,
        formatedDate
    } = useTodos();
    const {getCategoryName} = useCategories();

    return (
        <ul>
            {todos.sort((a, b) => a.isDone - b.isDone).map((todo) => (
                <li key={todo.id} className='d-flex form-control flex-column mb-2 list-item'>
                    <div className={`d-flex align-items-center justify-content-between fst-italic`}>
                        <div className='date-time__output'>
                            {getCategoryName(todo.categoryId)}
                        </div>
                        <span className='date-time__output'>
                            {todo.deadline ? 'до ' + formatedDate(todo.deadline) : ''}
                        </span>
                    </div>
                    <div
                        className={`d-flex gap-1 align-items-center justify-content-between ${todo.isDone ? 'text-decoration-line-through' : ''}`}>
                        <div className='d-flex gap-3'>
                            <input
                                type='checkbox'
                                disabled={todo.isDone}
                                onClick={() => handleIsDone(todo.id)}
                            />
                            <div className="text__output">
                                {todo.name}
                            </div>
                        </div>
                        <button
                            type='button'
                            onClick={() => handleDeleteTodo(todo.id)}>
                            <Trash className="trash-icon"/>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
