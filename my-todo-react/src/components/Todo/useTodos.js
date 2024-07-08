import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, isDone } from "../../redux/actions/todos";

const useTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [todo, setTodo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleAddTodo = () => {
        if (todo && selectedCategory) {
            dispatch(addTodo({ name: todo, categoryId: +selectedCategory, deadline }));
            setTodo('');
            setSelectedCategory('');
            setDeadline('');
        }
    };

    const handleDeleteTodo = (id) =>
        dispatch(deleteTodo({ id }));

    const handleIsDone = (id) =>
        dispatch(isDone({ id }));

    const handleInputChange =
        (setState) => (event) => setState(event.target.value);

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
