import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from "react";
import {fetchTodos, addTodo, deleteTodo, changeProgress} from '../../redux/actions/todos.js';

const useTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [todo, setTodo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const handleAddTodo = () => {
        const formattedDeadline = deadline ? new Date(deadline) : null;
        dispatch(addTodo({ name: todo, categoryId: +selectedCategory, deadline: formattedDeadline }));
        setTodo('');
        setSelectedCategory('');
        setDeadline('');
    };

    console.log('Rendered TodoList with todos:', todos);

    const handleDeleteTodo = (id) => dispatch(deleteTodo({id}));

    const handleIsDone = (id, isDone) => dispatch(changeProgress({id, isDone}));

    const handleInputChange = (setState) => (event) => setState(event.target.value);

    const formatedDate = (dateString) =>
        new Intl.DateTimeFormat('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(new Date(dateString));

    return {
        todos,
        todo,
        setTodo,
        selectedCategory,
        setSelectedCategory,
        deadline,
        setDeadline,
        handleAddTodo,
        handleDeleteTodo,
        handleIsDone,
        handleInputChange,
        formatedDate
    };
};

export default useTodos;
