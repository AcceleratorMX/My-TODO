import useTodos from "./useTodos";
import useCategories from "../Categories/useCategories";
import {Plus} from "react-bootstrap-icons";
import {handleInputChange} from "../../redux/helpers.js";

const TodoInput = () => {
    const {
        todo,
        setTodo,
        selectedCategory,
        setSelectedCategory,
        deadline,
        setDeadline,
        handleAddTodo,
        errors
    } = useTodos();
    const {categories} = useCategories();

    return (
        <div>
            <div className="form-control d-flex align-items-center p-0 ps-2 pe-2 mb-3">
                <input
                    className="text__input"
                    value={todo}
                    type="text"
                    onChange={handleInputChange(setTodo)}
                    placeholder="Сформулюйте завдання..."
                />
                <input
                    className="date-time__input form-control"
                    type="datetime-local"
                    value={deadline}
                    onChange={handleInputChange(setDeadline)}
                />
                <select
                    className="form-select select-category__input"
                    value={selectedCategory}
                    onChange={handleInputChange(setSelectedCategory)}
                >
                    <option value='' hidden>Категорія</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddTodo}>
                    <Plus className="plus-icon"/>
                </button>
            </div>
            <div className="error-message d-flex justify-content-between align-items-center mx-5">
                <p className="text-start">{errors.name && <span>{errors.name}</span>}</p>
                <p className="text-end">{errors.categoryId && <span>{errors.categoryId}</span>}</p>
            </div>
        </div>

    );
};

export default TodoInput;
