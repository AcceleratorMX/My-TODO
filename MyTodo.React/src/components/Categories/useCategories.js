import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {fetchCategories, addCategory, deleteCategory} from "../../redux/actions/categories.js";
import {validateCategoryFields} from "../../redux/validators.js";

const useCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
        const validationErrors = validateCategoryFields(category);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(addCategory({name: category}));
            setCategory('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    const handleDeleteCategory = (id) => dispatch(deleteCategory({id}));

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : "";
    };

    return {
        categories,
        category,
        setCategory,
        handleAddCategory,
        handleDeleteCategory,
        getCategoryName,
        errors
    };
};

export default useCategories;
