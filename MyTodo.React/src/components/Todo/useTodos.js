import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {fetchTodos, addTodo, deleteTodo, changeProgress} from "../../redux/actions/todos.js";
import {validateTodoFields} from "../../redux/validators.js";

const useTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [todo, setTodo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = () => {
        const validationErrors = validateTodoFields(todo, selectedCategory);

        if (Object.keys(validationErrors).length === 0) {
            const formattedDeadline = deadline ? new Date(deadline) : null;
            dispatch(addTodo({
                name: todo,
                categoryId: +selectedCategory,
                deadline: formattedDeadline
            }));
            setTodo('');
            setSelectedCategory('');
            setDeadline('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    const handleDeleteTodo = (id) => dispatch(deleteTodo({id}));

    const handleIsDone = (id, isDone) => dispatch(changeProgress({id, isDone}));

    const formatedDate = (dateString) =>
        new Intl.DateTimeFormat("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
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
        formatedDate,
        errors
    };
};

export default useTodos;
