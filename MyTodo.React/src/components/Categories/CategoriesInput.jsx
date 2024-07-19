import useCategories from './useCategories';
import {Plus} from 'react-bootstrap-icons';

const CategoriesInput = () => {
    const {
        category,
        setCategory,
        handleAddCategory,
        handleInputChange
    } = useCategories();

    return (
        <div className='form-control d-flex gap-2 align-items-center mb-3'>
            <input
                className='text__input'
                value={category}
                type='text'
                onChange={handleInputChange(setCategory)}
                placeholder='Введіть назву категорії...'
                required
            />
            <button
                type='button'
                onClick={handleAddCategory}>
                <Plus className='plus-icon'/>
            </button>
        </div>
    );
};

export default CategoriesInput;
