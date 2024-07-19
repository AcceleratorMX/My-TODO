import useCategories from "./useCategories";
import {Plus} from "react-bootstrap-icons";
import {handleInputChange} from "../../redux/helpers.js";

const CategoriesInput = () => {
    const {
        category,
        setCategory,
        handleAddCategory,
        errors
    } = useCategories();

    return (
        <div>
            <div className="form-control d-flex gap-2 align-items-center mb-3">
                <input
                    className="text__input"
                    value={category}
                    type="text"
                    onChange={handleInputChange(setCategory)}
                    placeholder="Введіть назву категорії..."
                />
                <button
                    type="button"
                    onClick={handleAddCategory}>
                    <Plus className="plus-icon"/>
                </button>
            </div>
            {errors.name && (
                <p className="error-message mx-5">{errors.name}</p>
            )}
        </div>
    );
};

export default CategoriesInput;
