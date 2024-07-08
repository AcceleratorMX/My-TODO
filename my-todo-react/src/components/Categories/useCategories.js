import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCategory, deleteCategory } from "../../redux/actions/categories";

const useCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [category, setCategory] = useState('');

    const handleAddCategory = () => {
        if (category) {
            dispatch(addCategory({ name: category }));
            setCategory('');
        }
    };

    const handleDeleteCategory = (id) =>
        dispatch(deleteCategory({ id }));

    const handleInputChange = (setState) =>
        (event) => setState(event.target.value);

    const getCategoryName = (categoryId) =>
        (categories.find(cat => cat.id === categoryId) || {}).name || '';

    return {
        categories,
        category,
        setCategory,
        handleAddCategory,
        handleDeleteCategory,
        getCategoryName,
        handleInputChange
    };
};

export default useCategories;
