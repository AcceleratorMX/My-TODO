import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { fetchCategories, addCategory, deleteCategory } from '../../redux/actions/categories.js';

const useCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
        if (category) {
            dispatch(addCategory({ name: category }));
            setCategory('');
        }
    };

    const handleDeleteCategory = (id) => dispatch(deleteCategory({ id }));

    const handleInputChange = (setState) => (event) => setState(event.target.value);

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

    return {
        categories,
        category,
        setCategory,
        handleAddCategory,
        handleDeleteCategory,
        handleInputChange,
        getCategoryName
    };
};

export default useCategories;
