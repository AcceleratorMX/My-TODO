import useCategories from "./useCategories";
import {Trash} from "react-bootstrap-icons";

const CategoriesList = () => {
    const {
        categories,
        handleDeleteCategory
    } = useCategories();

    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id} className="d-flex form-control justify-content-between mb-2 list-item">
                    {category.name}
                    <button
                        className="text__output"
                        type="button"
                        style={{display: category.id > 4 ? '' : "none"}}
                        onClick={() => handleDeleteCategory(category.id)}>
                        <Trash className="trash-icon"/>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default CategoriesList;
