import useTodos from './useTodos';
import useCategories from '../Categories/useCategories';
import {Trash} from 'react-bootstrap-icons';

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
                <li key={todo.id} className={`d-flex form-control flex-column mb-2 list-item ${todo.isDone ? 'opacity-75' : ''}`}>
                    <div className='d-flex align-items-center justify-content-between fst-italic'>
                        <div className='date-time__output'>
                            {getCategoryName(todo.categoryId)}
                        </div>
                        <span className='date-time__output'>
                            {todo.deadline ? 'до ' + formatedDate(todo.deadline) : ''}
                        </span>
                    </div>
                    <div className='d-flex gap-1 align-items-center justify-content-between'>
                        <div className='d-flex gap-3'>
                            <input
                                type="checkbox"
                                disabled={todo.isDone}
                                defaultChecked={todo.isDone}
                                onChange={(e) => handleIsDone(todo.id, e.target.checked)}
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
